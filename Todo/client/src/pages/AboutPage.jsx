import React from "react";
import { MyTextarea } from "../components/UI/input/areatext/MyTextarea";

export const AboutPage = () => {
    const props = {
        name: '',
        changeHandler: () => { }

    }
    return (
        <div>
            Список задач


            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />
            <MyTextarea props={props} />
            <hr />

        </div>
    )
}