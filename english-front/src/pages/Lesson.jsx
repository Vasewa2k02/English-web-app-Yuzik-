import { useContext, useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { observer } from "mobx-react-lite";
import { updateTask } from "../api-requests/task-api";
import "../styles/common.css";
import "../styles/lesson-page.css";
import Input from "../components/Input";
import { REGEXES } from "../utils/regexes";

import * as lessonApi from "../api-requests/lesson-api";
import * as taskApi from "../api-requests/task-api";
import { validateDto } from "../utils/helpers";
import { Toast } from "primereact/toast";
import { Slider } from "primereact/slider";
import { Message } from "primereact/message";
import { NOT_FOUND } from "../utils/statuses";
import {
  INVALID_INPUT,
  INVALID_INPUT_ENGLISH_SENTENCE,
  INVALID_INPUT_RUSSIAN_SENTENCE,
  NOT_SELECTED_LESSON,
  NOT_SELECTED_TASK,
  OLD_DATA,
} from "../utils/error-messages";

const Lesson = observer(() => {
  const toast = useRef(null);

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Успешно",
      detail: message || "Действие выполнено успешно",
      life: 3000,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Ошибка",
      detail:
        message || "Вы ввели неверные данные или данные на странице устарели",
      life: 3000,
    });
  };

  const [lessons, setLessons] = useState(null);
  const [lessonFilters, setLessonFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [lessonFilterValue, setLessonFilterValue] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [tasks, setTasks] = useState(null);
  const [taskFilters, setTaskFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [taskFilterValue, setTaskFilterValue] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadData();
    initFilters();
  }, []);

  const loadData = async () => {
    try {
      const _lessons = await lessonApi.getAdminLessons();
      setLessons(_lessons);
      setTasks(null);
      setSelectedLesson(null);
    } catch (error) {}
  };

  const initFilters = () => {
    setLessonFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setLessonFilterValue("");
    setTaskFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setLessonFilterValue("");
  };

  const renderHeader = (filterValue, filterChange) => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={filterValue}
            onChange={filterChange}
            placeholder="Keytask Search"
          />
        </span>
      </div>
    );
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const [lessonDto, setLessonDto] = useState({
    id: "",
    name: "",
    theory: "",
    passingPercent: 50,
  });

  const [isLessonValid, setIsLessonValid] = useState({
    name: true,
    theory: true,
  });

  const lessonRegexes = {
    name: REGEXES.LESSON_NAME_REGEX,
    theory: REGEXES.LESSON_THEORY_REGEX,
  };

  const selectLesson = (e) => {
    setSelectedLesson(e.value);
    setTasks(lessons.find((item) => item.id === e.value.id).tasks);
    setLessonDto({
      id: e.value.id,
      name: e.value.name,
      theory: e.value.theory,
      passingPercent: e.value.passingPercent,
    });

    setSelectedTask(null);
    setTaskDto({
      id: "",
      englishSentence: "",
      russianSentence: "",
      lessonId: e.value.id,
    });
  };

  const changeLessonHandler = ({ id, value }) => {
    setLessonDto((prev) => ({ ...prev, [id]: value }));
  };

  const createLesson = async (e) => {
    e.preventDefault();

    if (!validateDto(lessonDto, lessonRegexes, setIsLessonValid)) {
      return;
    }

    try {
      const { id, ...lessonDtoWithoutId } = lessonDto;
      const cteatedLesson = await lessonApi.createLesson(lessonDtoWithoutId);

      lessons.push(cteatedLesson);
      setLessons(lessons);

      setLessonDto({
        id: selectedLesson.id,
        name: "",
        theory: "",
        passingPercent: 50,
      });
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        await loadData();
        showError(OLD_DATA);
      } else {
        showError(INVALID_INPUT);
      }
    }
  };

  const updateLessonHandler = async () => {
    if (selectedLesson === null) {
      showError(NOT_SELECTED_LESSON);
      return;
    }

    if (!validateDto(lessonDto, lessonRegexes, setIsLessonValid)) {
      return;
    }

    const _lessons = [...lessons];
    const { id, ...lessonDtoWithoutId } = lessonDto;

    try {
      await lessonApi.updateLesson(id, lessonDtoWithoutId);
      _lessons[_lessons.findIndex((item) => item.id === id)] = lessonDto;
      setLessons(_lessons);
      showSuccess("Урок изменён.");
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        await loadData();
        showError(OLD_DATA);
      } else {
        showError(INVALID_INPUT);
      }
    }
  };

  const actionLessonBodyTemplate = (rowData) => {
    return (
      <Button icon="pi pi-trash" onClick={() => deleteLessonRow(rowData.id)} />
    );
  };

  const deleteLessonRow = async (id) => {
    try {
      await lessonApi.deleteLesson(id);
      setLessons(lessons.filter((item) => item.id !== id));
      setSelectedLesson(null);
      setTasks(null);
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        await loadData();
        showError(OLD_DATA);
      } else {
        showError(INVALID_INPUT);
      }
    }
  };

  const lessonFilterChange = (e) => {
    const value = e.target.value;
    const _lessonFilters = { ...lessonFilters };

    _lessonFilters["global"].value = value;

    setLessonFilters(_lessonFilters);
    setLessonFilterValue(value);
  };

  const lessonHeader = renderHeader(lessonFilterValue, lessonFilterChange);

  const [taskDto, setTaskDto] = useState({
    id: "",
    englishSentence: "",
    russianSentence: "",
    lessonId: "",
  });

  const [isTaskValid, setIsTaskValid] = useState({
    englishSentence: true,
    russianSentence: true,
  });

  const taskRegexes = {
    englishSentence: REGEXES.ENGLISH_SENTENCE_REGEX,
    russianSentence: REGEXES.RUSSIAN_SENTENCE_REGEX,
  };

  const selectTask = (e) => {
    setSelectedTask(e.value);
    setTaskDto({
      id: e.value.id,
      englishSentence: e.value.englishSentence,
      russianSentence: e.value.russianSentence,
      lessonId: selectedLesson.id,
    });
  };

  const changeTaskHandler = ({ id, value }) => {
    setTaskDto((prev) => ({ ...prev, [id]: value }));
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (selectedLesson === null) {
      showError(NOT_SELECTED_LESSON);
      return;
    }

    if (!validateDto(taskDto, taskRegexes, setIsTaskValid)) {
      return;
    }

    try {
      const { id, ...taskDtoWithoutId } = taskDto;
      const createdTask = await taskApi.createTask(taskDtoWithoutId);

      const _lessons = [...lessons];
      const _index = _lessons.indexOf(selectedLesson);

      _lessons[_index].tasks.push(createdTask);

      setLessons(_lessons);
      setTasks(_lessons[_index].tasks);

      setTaskDto({
        id: selectedTask?.id | "",
        englishSentence: "",
        russianSentence: "",
        lessonId: selectedLesson.id,
      });
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        await loadData();
        showError(OLD_DATA);
      } else {
        showError(INVALID_INPUT);
      }
    }
  };

  const updateTaskHandler = async () => {
    if (selectedLesson === null) {
      showError(NOT_SELECTED_LESSON);
      return;
    }

    if (selectedTask === null) {
      showError(NOT_SELECTED_TASK);
      return;
    }

    if (!validateDto(taskDto, taskRegexes, setIsTaskValid)) {
      return;
    }

    const { id, lessonId, ...tasksDtoWithoutId } = taskDto;

    try {
      await taskApi.updateTask(id, tasksDtoWithoutId);

      const _lessons = [...lessons];
      const _lessonIndex = _lessons.indexOf(selectedLesson);

      _lessons[_lessonIndex].tasks[tasks.indexOf(selectedTask)] = taskDto;

      setLessons(_lessons);
      setTasks(_lessons[_lessonIndex].tasks);

      showSuccess("Задание изменено.");
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        await loadData();
        showError(OLD_DATA);
      } else {
        showError(INVALID_INPUT);
      }
    }
  };

  const actionTaskBodyTemplate = (rowData) => {
    return (
      <Button icon="pi pi-trash" onClick={() => deleteTaskRow(rowData.id)} />
    );
  };

  const deleteTaskRow = async (id) => {
    try {
      await taskApi.deleteTask(id);

      const _lessons = [...lessons];
      const _lessonIndex = _lessons.indexOf(selectedLesson);
      const _taskIndex = tasks.indexOf((item) => item.id === id);

      _lessons[_lessonIndex].tasks.splice(_taskIndex, 1);
      setLessons(_lessons);
      setTasks(_lessons[_lessonIndex].tasks);
      setSelectedTask(null);
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        await loadData();
        showError(OLD_DATA);
      } else {
        showError(INVALID_INPUT);
      }
    }
  };

  const taskFilterChange = (e) => {
    const value = e.target.value;
    const _taskFilters = { ...taskFilters };

    _taskFilters["global"].value = value;

    setTaskFilters(_taskFilters);
    setTaskFilterValue(value);
  };

  const taskHeader = renderHeader(taskFilterValue, taskFilterChange);

  return (
    <div className="lesson-container">
      <Toast ref={toast} />
      <div className="tables">
        <DataTable
          className="card"
          value={lessons}
          editMode="row"
          dataKey="id"
          filters={lessonFilters}
          header={lessonHeader}
          globalFilterFields={["name"]}
          sortOrder={1}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
          selection={selectedLesson}
          onSelectionChange={selectLesson}
          metaKeySelection={true}
        >
          <Column
            field="name"
            header="назване"
            editor={(options) => textEditor(options)}
            sortable
            filterField="name"
          />
          <Column
            field="passingPercent"
            header="проходной процент"
            editor={(options) => textEditor(options)}
            headerStyle={{ width: "10px", textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
            sortable
          />
          <Column body={actionLessonBodyTemplate} />
        </DataTable>
        <DataTable
          className="card"
          value={tasks}
          editMode="row"
          dataKey="id"
          filters={taskFilters}
          header={taskHeader}
          globalFilterFields={["englishSentence", "russianSentence"]}
          sortOrder={1}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
          selection={selectedTask}
          onSelectionChange={selectTask}
          metaKeySelection={true}
        >
          <Column
            field="englishSentence"
            header="английский"
            editor={(options) => textEditor(options)}
            sortable
            filterField="englishSentence"
          />
          <Column
            field="russianSentence"
            header="русский"
            editor={(options) => textEditor(options)}
            sortable
            filterField="russianSentence"
          />
          <Column body={actionTaskBodyTemplate} />
        </DataTable>
      </div>
      <div className="input-area margin-top-30">
        <div className="lesson-fields">
          <h4 className="lesson-fields__label">Форма для добавления уроков</h4>
          <Input
            className="lesson-fields__name"
            id="name"
            value={lessonDto.name}
            lableText="Название"
            isValidValue={isLessonValid.name}
            inputType="text"
            setDataHandler={changeLessonHandler}
            errorMessage="Некорректное название словаря"
          />
          <div className="lesson-fields__passing-percent">
            <label className="learning-settings__label">
              Проходной процент
            </label>
            <Slider
              className="lesson-fields__slider"
              value={lessonDto.passingPercent}
              min={0}
              max={100}
              onChange={(e) =>
                changeLessonHandler({ id: "passingPercent", value: e.value })
              }
            />
            <label>{lessonDto.passingPercent}%</label>
          </div>
          <label className="lesson-fields__theory-label">Теория к уроку</label>
          <InputTextarea
            className="lesson-fields__theory"
            id="theory"
            value={lessonDto.theory}
            onChange={(e) =>
              changeLessonHandler({ id: "theory", value: e.target.value })
            }
            rows={4}
          />
          {!isLessonValid.theory && (
            <div className="lesson-fields__theory-error-message">
              <Message severity="error" text={"Неверный формат данных"} />
            </div>
          )}
          <div className="lesson-fields__buttons">
            <Button
              className="lesson-fields__button"
              label="Изменить"
              onClick={updateLessonHandler}
            />
            <Button
              className="lesson-fields__button"
              label="Добавить"
              onClick={createLesson}
            />
          </div>
        </div>
        <div className="task-fields">
          <h4 className="task-fields__name">Форма для добавления заданий</h4>
          <label className="task-fields__english-sentence-label">
            Предложение на английском языке
          </label>
          <InputTextarea
            className="task-fields__english-sentence"
            id="englishSentence"
            value={taskDto.englishSentence}
            onChange={(e) =>
              changeTaskHandler({
                id: "englishSentence",
                value: e.target.value,
              })
            }
            rows={2}
          />
          {!isTaskValid.englishSentence && (
            <div className="lesson-fields__english-sentence-error-message">
              <Message severity="error" text={INVALID_INPUT_ENGLISH_SENTENCE} />
            </div>
          )}
          <label className="task-fields__russian-sentence-label">
            Предложение на русском языке
          </label>
          <InputTextarea
            className="task-fields__russian-sentence"
            id="russianSentence"
            value={taskDto.russianSentence}
            onChange={(e) =>
              changeTaskHandler({
                id: "russianSentence",
                value: e.target.value,
              })
            }
            rows={2}
          />
          {!isTaskValid.russianSentence && (
            <div className="lesson-fields__russian-sentence-error-message">
              <Message severity="error" text={INVALID_INPUT_RUSSIAN_SENTENCE} />
            </div>
          )}
          <div className="task-fields__buttons">
            <Button
              className="task-fields__button"
              label="Изменить"
              onClick={updateTaskHandler}
            />
            <Button
              className="task-fields__button"
              label="Добавить"
              onClick={createTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Lesson;
