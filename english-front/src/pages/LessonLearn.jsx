import { useContext, useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { observer } from "mobx-react-lite";
import "../styles/common.css";
import "../styles/lesson-learn-page.css";

import * as lessonApi from "../api-requests/lesson-api";
import * as taskApi from "../api-requests/task-api";
import { validateDto } from "../utils/helpers";
import { Toast } from "primereact/toast";
import { NOT_FOUND } from "../utils/statuses";

import { Context } from "..";
import { LearningMode } from "../utils/learn-settings";
import { REGEXES } from "../utils/regexes";

import * as statisticsApi from "../api-requests/statistics-api";
import * as grammarProgressApi from "../api-requests/grammar-progress-api";

const LessonLearn = observer(() => {
  const { userSettings } = useContext(Context);
  const toast = useRef(null);

  const showSuccess = (message, summary, life) => {
    toast.current.show({
      severity: "success",
      summary: summary || "Успешно",
      detail: message,
      life: life || 3000,
    });
  };

  const showError = (message, summary, life) => {
    toast.current.show({
      severity: "error",
      summary: summary || "Ошибка",
      detail:
        message || "Вы ввели неверные данные или данные на странице устарели",
      life: life || 3000,
    });
  };

  const [lessons, setLessons] = useState(null);
  const [lessonFilters, setLessonFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [lessonFilterValue, setLessonFilterValue] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [tasks, setTasks] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentTaskAnswer, setCurrentTaskAnswer] = useState(null);
  const [currentTaskFinishedAnswer, setCurrentTaskFinishedAnswer] = useState(
    []
  );

  useEffect(() => {
    loadData();
    initFilters();
  }, []);

  const changeCurrentTask = async () => {
    setCurrentTaskAnswer(null);
    setCurrentTaskFinishedAnswer([]);

    const _tasks = [...tasks];

    if (_tasks.length === 0) {
      const _lessons = await lessonApi.getStudyLessons();

      if (_lessons.length > lessons.length) {
        setLessons(_lessons);

        showSuccess(
          "Задания в уроке закончились. Выберите другой урок!",
          "Завершёно",
          5000
        );
      } else {
        showError(
          "Вы не достаточно изучили тему. Попробуйте почитать теорию и пройти урок ещё раз!",
          "Неудача :(",
          5000
        );
      }

      setCurrentTask(null);
      setSelectedLesson(null);

      return;
    }

    let _currentTask = _tasks.shift();

    switch (userSettings.getLearningModeTasks()) {
      case LearningMode.TRANSLATE_FROM_ENGLISH:
        _currentTask = {
          id: _currentTask.id,
          mainSentence: _currentTask.russianSentence,
          translateSentence: _currentTask.englishSentence,
        };
        break;

      case LearningMode.TRANSLATE_FROM_RUSSIAN:
        _currentTask = {
          id: _currentTask.id,
          mainSentence: _currentTask.russianSentence,
          translateSentence: _currentTask.englishSentence,
        };
        break;

      case LearningMode.COMBINED:
        if (Math.random() < 0.5 ? 0 : 1) {
          _currentTask = {
            id: _currentTask.id,
            mainSentence: _currentTask.russianSentence,
            translateSentence: _currentTask.englishSentence,
          };
        } else {
          _currentTask = {
            id: _currentTask.id,
            mainSentence: _currentTask.englishSentence,
            translateSentence: _currentTask.russianSentence,
          };
        }
        break;

      default:
        break;
    }

    setCurrentTask(_currentTask);
    setCurrentTaskAnswer(
      _currentTask.translateSentence
        .split(REGEXES.PUNCTUATION_MARKS)
        .sort(() => Math.random() - 0.5)
        .filter(Boolean)
    );
  };

  useEffect(() => {
    if (tasks === null) {
      return;
    }

    changeCurrentTask();
  }, [tasks]);

  const loadData = async () => {
    try {
      const _lessons = await lessonApi.getStudyLessons();
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

  const selectLesson = (e) => {
    setSelectedLesson(e.value);
    setTasks(
      lessons
        .find((item) => item.id === e.value.id)
        .tasks.sort(() => Math.random() - 0.5)
    );
  };

  const lessonFilterChange = (e) => {
    const value = e.target.value;
    const _lessonFilters = { ...lessonFilters };

    _lessonFilters["global"].value = value;

    setLessonFilters(_lessonFilters);
    setLessonFilterValue(value);
  };

  const lessonHeader = renderHeader(lessonFilterValue, lessonFilterChange);

  const checkAnswer = async (finishedAnswer) => {
    if (
      currentTask.translateSentence
        .split(REGEXES.PUNCTUATION_MARKS)
        .filter(Boolean)
        .join()
        .toUpperCase() === finishedAnswer
    ) {
      await statisticsApi.createOrUpdateStatistics({ tasks: 1 });
      await grammarProgressApi.createGrammarProgress({
        taskId: currentTask.id,
      });
    } else {
      showError(
        `Правильно: ${currentTask.mainSentence} - ${currentTask.translateSentence}`,
        "Ответ не верный :("
      );
    }

    const _tasks = [...tasks];
    _tasks.shift();
    setTasks(_tasks);
  };

  const answerSentenceHandler = (wordIndex) => {
    const _currentTaskFinishedAnswer = [...currentTaskFinishedAnswer];
    const _currentTaskAnswer = [...currentTaskAnswer];

    _currentTaskFinishedAnswer.push(_currentTaskAnswer.splice(wordIndex, 1)[0]);

    if (_currentTaskAnswer.length === 0) {
      checkAnswer(_currentTaskFinishedAnswer.join().toUpperCase());
    } else {
      setCurrentTaskAnswer(_currentTaskAnswer);
      setCurrentTaskFinishedAnswer(_currentTaskFinishedAnswer);
    }
  };

  const answerCancelSentenceHandler = (wordIndex) => {
    const _currentTaskFinishedAnswer = [...currentTaskFinishedAnswer];
    const _currentTaskAnswer = [...currentTaskAnswer];

    _currentTaskAnswer.push(_currentTaskFinishedAnswer.splice(wordIndex, 1)[0]);
    setCurrentTaskAnswer(_currentTaskAnswer);
    setCurrentTaskFinishedAnswer(_currentTaskFinishedAnswer);
  };

  return (
    <div className="lesson-learn-container">
      <Toast ref={toast} />
      <div className="lesson-learn__fields">
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
          <Column field="name" header="назване" sortable filterField="name" />
          <Column
            field="passingPercent"
            header="проходной процент"
            headerStyle={{ width: "10px", textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
            sortable
          />
        </DataTable>
        <div className="lesson-learn__task-fields">
          <Card
            title={
              currentTask
                ? "Переведите предложение, расставив слова в нужном порядке"
                : "Выберите урок"
            }
          >
            {currentTask && <p className="m-0">{currentTask.mainSentence}</p>}
            <div className="lesson-learn__answer-finished">
              {currentTaskFinishedAnswer &&
                currentTaskFinishedAnswer.map((word, i) => (
                  <Button
                    className="answer-word"
                    key={i}
                    label={word}
                    onClick={() => answerCancelSentenceHandler(i)}
                    outlined
                  />
                ))}
            </div>
            <div className="lesson-learn__answer">
              {currentTaskAnswer &&
                currentTaskAnswer.map((word, i) => (
                  <Button
                    className="answer-word"
                    key={i}
                    label={word}
                    onClick={() => answerSentenceHandler(i)}
                    outlined
                  />
                ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="lesson-learn__lesson-theory">
        <Fieldset legend="Теория" toggleable>
          <p className="m-1">{selectedLesson && selectedLesson.theory}</p>
        </Fieldset>
      </div>
    </div>
  );
});

export default LessonLearn;