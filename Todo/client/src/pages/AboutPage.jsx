import React, { useRef, useEffect, useState } from "react";
import { MyTextarea } from "../components/UI/input/areatext/MyTextarea";

export const AboutPage = () => {

    return (
        <div className="about">
            <ul >
                <h4 >Stack</h4>
                <li>Frontend: React (functional components, hooks), css(less)</li>
                <li>Backend: firebase - firestore database (сохранение данных о задаче), storage (сохранение файлов)</li>
                <li>Hoisting: firebase</li>
            </ul>

            <ul>
                <h4 >Функционал:</h4>
                <li>создание, просмотр, редактирование (изменение полей и то, что задача выполнена), удаление задачи</li>
                <li>возможность прикрепления файлов к записи (сохранение в firebase storage)</li>
                <li>schedular task - индикация задачи (выполнена, ожидание выполнения, просрочена)</li>
            </ul>

            <ul>
                <h4 >Ссылки:</h4>
                <li>
                    <a

                        href="https://github.com/Xostron/React-Firebase.git" target="_blank" >
                        Посмотреть код на GitHub
                    </a>
                </li>
                {/* <li>
                    <a
                        href="https://kanban-react-417bf.web.app" target="_blank" >
                        Посмотреть сайт
                    </a>
                </li> */}

                <h4 >Контактная информация</h4>
                <li>
                    <a
                        href="https://t.me/Xostron" target="_blank" >
                        Мой телеграм: https://t.me/Xostron
                    </a>

                </li>
                <li>

                    <a
                        href="mailto://xostron8@gmail.com.subject=вакансия" target="_blank" >
                        Почта: xostron8@gmail.com
                    </a>
                </li>
            </ul>

        </div>
    )
}
