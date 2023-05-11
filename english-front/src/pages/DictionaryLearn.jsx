import React, { useContext, useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { observer } from "mobx-react-lite";
import { updateWord } from "../api-requests/word-api";
import Input from "../components/Input";
import { REGEXES } from "../utils/regexes";

import * as dictionaryApi from "../api-requests/dictionary-api";
import * as wordApi from "../api-requests/word-api";
import { Toast } from "primereact/toast";
import { Context } from "..";
import { ROLES } from "../utils/roles";
import { LearningMode, NUMBER_OF_WORD_CHOICES } from "../utils/learn-settings";

import "../styles/dictionary-learn-page.css";
import * as lexiconProgressApi from "../api-requests/lexicon-progress-api";
import * as statisticsApi from "../api-requests/statistics-api";

import { Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";

import io from "socket.io-client";

const SOCKET_URL = "https://localhost:5001/api";

const LexiconProgress = observer(() => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("message", inputValue);
    setInputValue("");
  };

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

  const [dictionaries, setDictionaries] = useState(null);
  const [dictionaryFilters, setDictionaryFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [dictionaryFilterValue, setDictionaryFilterValue] = useState("");
  const [selectedDictionary, setSelectedDictionary] = useState(null);

  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentWords, setCurrentWords] = useState(null);

  useEffect(() => {
    loadData();
    initFilters();
  }, []);

  const loadData = async () => {
    try {
      const _dictionaries = await dictionaryApi.getDictionariesLearn();
      _dictionaries.map((dictionary) => {
        dictionary.words.map((word) => {
          word.lexiconProgressId = word.lexiconProgress[0]?.id | undefined;
          word.progressCount = word.lexiconProgress[0]?.progressCount | 0;
          word.isLearned = word.lexiconProgress[0]?.isLearned | false;
        });
      });

      setDictionaries(_dictionaries);
      setSelectedDictionary(_dictionaries[0]);
      setWords(_dictionaries[0].words);
    } catch (error) {}
  };

  const changeCurrentWords = () => {
    const _words = [...words];

    let _currentWords = _words
      .slice(0, userSettings.getCountRepeatWordsSimultaneously())
      .sort(() => Math.random() - 0.5)
      .slice(0, NUMBER_OF_WORD_CHOICES);

    switch (userSettings.getLearningModeWords()) {
      case LearningMode.TRANSLATE_FROM_ENGLISH:
        _currentWords = _currentWords.map((word) => {
          return {
            id: word.id,
            mainSpelling: word.englishSpelling,
            translateSpelling: word.russianSpelling,
            description: word.description,
          };
        });
        break;

      case LearningMode.TRANSLATE_FROM_RUSSIAN:
        _currentWords = _currentWords.map((word) => {
          return {
            id: word.id,
            mainSpelling: word.russianSpelling,
            translateSpelling: word.englishSpelling,
            description: word.description,
          };
        });
        break;

      case LearningMode.COMBINED:
        if (Math.random() < 0.5 ? 0 : 1) {
          _currentWords = _currentWords.map((word) => {
            return {
              id: word.id,
              mainSpelling: word.englishSpelling,
              translateSpelling: word.russianSpelling,
              description: word.description,
            };
          });
        } else {
          _currentWords = _currentWords.map((word) => {
            return {
              id: word.id,
              mainSpelling: word.russianSpelling,
              translateSpelling: word.englishSpelling,
              description: word.description,
            };
          });
        }
        break;

      default:
        break;
    }

    setCurrentWords(_currentWords);
    setCurrentWord(
      _currentWords.sort(() => Math.random() - 0.5).slice(0, 1)[0]
    );
  };

  useEffect(() => {
    if (words === null) {
      return;
    }

    changeCurrentWords();
  }, [words]);

  const answerHandler = async (spelling) => {
    try {
      const isCorrectAnswer = currentWord.translateSpelling === spelling;
      const data = await lexiconProgressApi.giveLexiconProgressAnswer({
        isCorrectAnswer,
        wordId: currentWord.id,
      });

      if (isCorrectAnswer) {
        await statisticsApi.createOrUpdateStatistics({ words: 1 });
      } else {
        showError(
          `Правильно: ${currentWord.mainSpelling} - ${currentWord.translateSpelling}`,
          "Ответ не верный :("
        );
      }

      if (data.isLearned) {
        showSuccess("Вы выучили новое слово!", "Поздравляем!");

        let _dictionaries = [...dictionaries];
        let _words = [...words];
        const _dictionaryIndex = _dictionaries.indexOf(selectedDictionary);
        const _wordIndex = _words.findIndex(
          (item) => item.id === currentWord.id
        );

        _words.splice(_wordIndex, 1);
        _dictionaries[_dictionaryIndex].words = _words;

        setDictionaries(_dictionaries);
        setWords(_words);
      } else {
        changeCurrentWords();
      }
    } catch (error) {}
  };

  const initFilters = () => {
    setDictionaryFilters({
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

  const selectDictionary = (e) => {
    setSelectedDictionary(e.value);
    setWords(dictionaries.find((item) => item.id === e.value.id).words);
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

  return (
    <div className="dictionary-learn-container">
      <Toast ref={toast} />
      <div className="single-learn">
        <DataTable
          className="card"
          value={dictionaries}
          editMode="row"
          dataKey="id"
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
          <Column field="name" header="назване" sortable filterField="name" />
          <Column field="description" header="описание" sortable />
        </DataTable>
        <div className="single-learn__word-field">
          {currentWord && (
            <label>
              {currentWord.mainSpelling}
              {currentWord.description && (
                <span> ({currentWord.description})</span>
              )}
            </label>
          )}
          {currentWords !== null &&
            currentWords.map((word) => (
              <Button
                key={word.id}
                label={word.translateSpelling}
                onClick={() => answerHandler(word.translateSpelling)}
                outlined
              />
            ))}
        </div>
      </div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
});

export default LexiconProgress;
