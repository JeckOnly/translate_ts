import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {isCheckedKey} from "./constant";

const Popup = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        console.log("Popup component mounted");
        // 这里可以添加任何需要在每次加载 popup.html 时执行的初始化代码

        chrome.storage.local.get([isCheckedKey], (result) => {
            if (result[isCheckedKey] !== undefined) {
                setIsChecked(result[isCheckedKey]);
            }
        });
    }, []);

    const handleSwitchChange = () => {
        console.log("handleSwitchChange called");
        setIsChecked((prev) => {
            const next = !prev;
            console.log("保存isChecked为" + next);
            chrome.storage.local.set({[isCheckedKey]: next});
            return next;
        });
    };


    return (
        <>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={() => {
                    console.log("Checkbox clicked");
                    handleSwitchChange();
                }}/>
                <span className="slider round"></span>
            </label>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);
console.log("pop up js在执行");
root.render(
    <React.StrictMode>
        <Popup/>
    </React.StrictMode>
);
