import React from "react";
import "./ConfirmationModel.css";

const ConformationModel=({
    title,
    desc,
    onConfrim,
   onClose,
   confirmBtnText
})=>{
    return(
        <>
            <div className="modal-backdrop">
                <div className="modal">
                    <h2>{title}</h2>
                    <p>{desc}</p>

                    <div className="modal-action">
                        <button className="btn btn-cancel" onClick={onClose}>Cancel</button>

                        <button className="btn btn-delete" onClick={onConfrim}>{confirmBtnText}</button>
                    </div>
                </div>
            </div>
        </>

    );
}
export default ConformationModel;