import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { isCheckedKey } from "./constant";

const Popup = () => {
    const [isChecked, setIsChecked] = useState<boolean>(() => {
        const saved = localStorage.getItem(isCheckedKey);
        return saved ? JSON.parse(saved) : false;
    })

    const handleSwitchChange = () => {
        console.log("handleSwitchChange called");
        setIsChecked((prev) => {
            const next = !prev;

            console.log("保存isChecked为" + next);
            localStorage.setItem(isCheckedKey, JSON.stringify(next));
            return next;
        });
    };


    return (
        <>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={() => {
                    console.log("Checkbox clicked");
                    handleSwitchChange();
                }} />
                <span className="slider round"></span>
            </label>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
