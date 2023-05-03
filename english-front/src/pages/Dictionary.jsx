import { useContext, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { observer } from "mobx-react-lite";
import { getUserDictionaries } from "../api-requests/dictionary-api";
import { updateWord } from "../api-requests/word-api";
import "../styles/common.css";
import "../styles/dictionary-page.css";
import Input from "../components/Input";
import { REGEXES } from "../utils/regexes";

import * as dictionaryApi from "../api-requests/dictionary-api";
import * as wordApi from "../api-requests/word-api";
import { validateDto } from "../utils/helpers";

const Dictionary = observer(() => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [dictionaries, setDictionaries] = useState(null);
  const [dictionaryFilters, setDictionaryFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [dictionaryFilterValue, setDictionaryFilterValue] = useState("");
  const [selectedDictionary, setSelectedDictionary] = useState(null);

  const [words, setWords] = useState(null);
  const [wordFilters, setWordFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [wordFilterValue, setWordFilterValue] = useState("");

  useEffect(() => {
    loadData();
    initFilters();
  }, []);

  const loadData = async () => {
    try {
      const _dictionaries = await getUserDictionaries();
      setDictionaries(_dictionaries);
      setSelectedDictionary(_dictionaries[0]);
      setWords(_dictionaries[0].words);
    } catch (error) {}
  };

  const notifyError = (errorMessage) => {
    setDialogMessage(
      errorMessage
        ? errorMessage
        : "Вы ввели неверные данные или данные на странице устарели"
    );
    setDialogVisible(true);
  };

  const initFilters = () => {
    setDictionaryFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setDictionaryFilterValue("");
    setWordFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setDictionaryFilterValue("");
  };

  const renderHeader = (filterValue, filterChange) => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={filterValue}
            onChange={filterChange}
            placeholder="Keyword Search"
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

  const [dictionaryDto, setDictionaryDto] = useState({
    name: "",
    description: null,
  });

  const [isDictionaryValid, setIsDictionaryValid] = useState({
    name: true,
    description: true,
  });

  const dictionaryRegexes = {
    name: REGEXES.DICTIONARY_NAME_REGEX,
    description: REGEXES.DICTIONARY_DESCRIPTION_REGEX,
  };

  const selectDictionary = (e) => {
    setSelectedDictionary(e.value);
    setWords(dictionaries.find((item) => item.id === e.value.id).words);
  };

  const changeDictionaryHandler = ({ id, value }) => {
    setDictionaryDto((prev) => ({ ...prev, [id]: value }));
  };

  const createDictionary = async (e) => {
    e.preventDefault();

    if (!validateDto(dictionaryDto, dictionaryRegexes, setIsDictionaryValid)) {
      return;
    }

    try {
      const cteatedDictionary = await dictionaryApi.createDictionary({
        name: dictionaryDto.name,
        description: dictionaryDto.description,
      });

      dictionaries.push(cteatedDictionary);
      setDictionaries(dictionaries);

      setDictionaryDto({
        name: "",
        description: "",
      });
    } catch (error) {
      await loadData();
      notifyError();
    }
  };

  const onDictionaryEditComplete = async (e) => {
    const _dictionaries = [...dictionaries];
    const { newData, index } = e;
    const { id, words, creatorId, ..._dictionaryDto } = newData;

    for (const prop in _dictionaryDto) {
      if (!dictionaryRegexes[prop].test(_dictionaryDto[prop])) {
        notifyError("Вы ввели неверные данные");
        return;
      }
    }

    try {
      await dictionaryApi.updateDictionary(newData.id, newData);
      _dictionaries[index] = newData;
      setDictionaries(_dictionaries);
    } catch (error) {
      await loadData();
      notifyError();
    }
  };

  const actionDictionaryBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => deleteDictionaryRow(rowData.id)}
      />
    );
  };

  const deleteDictionaryRow = async (id) => {
    try {
      await dictionaryApi.deleteDictionary(id);
      setDictionaries(dictionaries.filter((item) => item.id !== id));
      setSelectedDictionary(null);
      setWords(null);
    } catch (error) {
      await loadData();
      notifyError();
    }
  };

  const dictionaryFilterChange = (e) => {
    const value = e.target.value;
    const _dictionaryFilters = { ...dictionaryFilters };

    _dictionaryFilters["global"].value = value;

    setDictionaryFilters(_dictionaryFilters);
    setDictionaryFilterValue(value);
  };

  const dictionaryHeader = renderHeader(
    dictionaryFilterValue,
    dictionaryFilterChange
  );

  const [wordDto, setWordDto] = useState({
    englishSpelling: "",
    transcription: "",
    russianSpelling: "",
    description: "",
  });

  const [isWordValid, setIsWordValid] = useState({
    englishSpelling: true,
    transcription: true,
    russianSpelling: true,
    description: true,
  });

  const wordRegexes = {
    englishSpelling: REGEXES.WORD_ENGLISH_REGEX,
    transcription: REGEXES.WORD_TRANSCRIPTION_REGEX,
    russianSpelling: REGEXES.WORD_RUSSIAN_REGEX,
    description: REGEXES.WORD_DESCRIPTION_REGEX,
  };

  const changeWordHandler = ({ id, value }) => {
    setWordDto((prev) => ({ ...prev, [id]: value }));
  };

  const createWord = async (e) => {
    e.preventDefault();

    if (selectedDictionary === null) {
      notifyError(
        "Вы не выбрали словарь в который хотите добавить слово! Это можно сделать кликнув на нужный словарь."
      );
      return;
    }

    if (!validateDto(wordDto, wordRegexes, setIsWordValid)) {
      return;
    }

    try {
      const createdWord = await wordApi.createWord(selectedDictionary.id, {
        englishSpelling: wordDto.englishSpelling,
        transcription: wordDto.transcription,
        russianSpelling: wordDto.russianSpelling,
        description: wordDto.description,
      });

      const _dictionaries = [...dictionaries];
      const _index = _dictionaries.indexOf(selectedDictionary);

      _dictionaries[_index].words.push(createdWord);

      setDictionaries(_dictionaries);
      setWords(_dictionaries[_index].words);

      setWordDto({
        englishSpelling: "",
        transcription: "",
        russianSpelling: "",
        description: "",
      });
    } catch (error) {
      await loadData();
      notifyError();
    }
  };

  const onWordEditComplete = async (e) => {
    try {
      const { newData, index } = e;
      const { id, ..._wordDto } = newData;

      for (const prop in _wordDto) {
        if (!wordRegexes[prop].test(_wordDto[prop])) {
          notifyError("Вы ввели неверные данные");
          return;
        }
      }

      await updateWord(id, newData);

      const _dictionaries = [...dictionaries];
      const _dictionaryIndex = dictionaries.indexOf(selectedDictionary);

      _dictionaries[_dictionaryIndex].words[index] = newData;

      setDictionaries(_dictionaries);
      setWords(_dictionaries[_dictionaryIndex].words);
    } catch (error) {
      await loadData();
      notifyError();
    }
  };

  const actionWordBodyTemplate = (rowData) => {
    return (
      <Button icon="pi pi-trash" onClick={() => deleteWordRow(rowData.id)} />
    );
  };

  const deleteWordRow = async (id) => {
    try {
      await wordApi.deleteWord(id, selectedDictionary.id);
      const _dictionaries = [...dictionaries];
      const _dictionaryIndex = _dictionaries.indexOf(selectedDictionary);
      const _wordIndex = words.indexOf((item) => item.id === id);

      _dictionaries[_dictionaryIndex].words.splice(_wordIndex, 1);

      setDictionaries(_dictionaries);
      setWords(_dictionaries[_dictionaryIndex].words);
    } catch (error) {
      await loadData();
      notifyError();
    }
  };

  const wordFilterChange = (e) => {
    const value = e.target.value;
    const _wordFilters = { ...wordFilters };

    _wordFilters["global"].value = value;

    setWordFilters(_wordFilters);
    setWordFilterValue(value);
  };

  const wordHeader = renderHeader(wordFilterValue, wordFilterChange);

  return (
    <div className="container">
      <div className="tables">
        <DataTable
          className="card"
          value={dictionaries}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onDictionaryEditComplete}
          filters={dictionaryFilters}
          header={dictionaryHeader}
          globalFilterFields={["name"]}
          sortOrder={1}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
          selection={selectedDictionary}
          onSelectionChange={selectDictionary}
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
            field="description"
            header="описание"
            editor={(options) => textEditor(options)}
            sortable
          />
          <Column
            rowEditor
            headerStyle={{ width: "10px" }}
            bodyStyle={{ textAlign: "center" }}
          />
          <Column body={actionDictionaryBodyTemplate} />
        </DataTable>
        <DataTable
          className="card"
          value={words}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onWordEditComplete}
          filters={wordFilters}
          header={wordHeader}
          globalFilterFields={["englishSpelling", "russianSpelling"]}
          sortOrder={1}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <Column
            field="englishSpelling"
            header="английский"
            editor={(options) => textEditor(options)}
            sortable
            filterField="englishSpelling"
          />
          <Column
            field="transcription"
            header="транскрипция"
            editor={(options) => textEditor(options)}
            sortable
          />
          <Column
            field="russianSpelling"
            header="русский"
            editor={(options) => textEditor(options)}
            sortable
            filterField="russianSpelling"
          />
          <Column
            field="description"
            header="описание"
            editor={(options) => textEditor(options)}
            sortable
          />
          <Column
            rowEditor
            headerStyle={{ width: "10px" }}
            bodyStyle={{ textAlign: "center" }}
          />
          <Column body={actionWordBodyTemplate} />
        </DataTable>
      </div>
      <div className="input-area margin-top-30">
        <div className="dictionary-fields">
          <h4 className="dictionary-fields__name">
            Форма для добавления словарей
          </h4>
          <Input
            id="name"
            value={dictionaryDto.name}
            lableText="Название"
            isValidValue={isDictionaryValid.name}
            inputType="text"
            setDataHandler={changeDictionaryHandler}
            errorMessage="Некорректное название словаря"
          />
          <Input
            id="description"
            value={dictionaryDto.description}
            lableText="Описание"
            isValidValue={isDictionaryValid.description}
            inputType="text"
            placeholder="необязательное поле"
            setDataHandler={changeDictionaryHandler}
            errorMessage="Некорректное описание"
          />
          <Button
            className="dictionary-create-submit"
            label="Добавить"
            onClick={createDictionary}
          />
        </div>
        <div className="word-fields">
          <h4 className="word-fields__name">Форма для добавления слов</h4>
          <Input
            id="englishSpelling"
            value={wordDto.englishSpelling}
            lableText="английский"
            isValidValue={isWordValid.englishSpelling}
            inputType="text"
            setDataHandler={changeWordHandler}
            errorMessage="От 2 до 30 английских символов"
          />
          <Input
            id="transcription"
            value={wordDto.transcription}
            lableText="транскрипция"
            isValidValue={isWordValid.transcription}
            inputType="text"
            setDataHandler={changeWordHandler}
            errorMessage="От 2 до 50 символов"
          />
          <Input
            id="russianSpelling"
            value={wordDto.russianSpelling}
            lableText="русский"
            isValidValue={isWordValid.russianSpelling}
            inputType="text"
            setDataHandler={changeWordHandler}
            errorMessage="От 2 до 30 руссих символов"
          />
          <Input
            id="description"
            value={wordDto.description}
            lableText="описание"
            isValidValue={isWordValid.description}
            inputType="text"
            setDataHandler={changeWordHandler}
            errorMessage="До 30 символов"
          />
          <Button
            className="dictionary-create-submit word-fields__button"
            label="Добавить"
            onClick={createWord}
          />
        </div>
      </div>
      <Dialog
        header="Ошибка"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
      >
        <p className="m-0">{dialogMessage}</p>
      </Dialog>
    </div>
  );
});

export default Dictionary;