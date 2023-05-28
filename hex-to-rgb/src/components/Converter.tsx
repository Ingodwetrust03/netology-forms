import React, {useState} from "react";


export default function Converter () {
    const regex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

    const initialFormState = {
        hexInput: "#",
        rgbInput: "rgb ( )",
        rgbColor: "",
        error: false,
        errorMessage: "Ошибка"
    }

    const [form, setForm] = useState(initialFormState)



    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setForm((prevForm) => {
            return {
                ...prevForm,
                [name]: value,
            }
        })
    }

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        let hexArray = []
        let clearedHexColor = form.hexInput.trim().replace(/[\s\#]/g, "");

        if (e.target.value.length === 7) {
            if (clearedHexColor.match(regex)) {
                clearedHexColor.split(regex).map(e => {
                    if (!isNaN(parseInt(e, 16))) {
                        hexArray.push(parseInt(e, 16))
                        let rgb = hexArray.join(",")
                        setForm((prevForm) => {
                            return {
                                ...prevForm,
                                rgbInput: `rgb ( ${rgb} )`,
                                rgbColor: rgb,
                                errorMessage: "",
                                error: false
                            }
                        })

                    }
                })

            }
        }
        if (e.target.value.length < 6 || !clearedHexColor.match(regex)) {
                setForm((prevForm) => {
                    return {
                      ...prevForm,
                        error: true,
                        errorMessage: "Ошибка"
                    }
                })
        }
    }




    return (
        <section className="form-section" style={{backgroundColor:  form.error  ? '#e74c3c' : form.hexInput}}>
            <form className="change-color-form" >
                <fieldset>
                    <div>
                        <input id="Hex" type="text" name="hexInput" maxLength={7} value={form.hexInput} onChange={getValue} onBlur={changeColor}/>
                    </div>
                    <div>
                        <input type="text" disabled style={{backgroundColor:  form.error  ? '#e74c3c' : form.hexInput, filter: "brightness(.8)"}} value={form.error  ? form.errorMessage : form.rgbInput} />
                    </div>
                </fieldset>
            </form>
        </section>

    )
}