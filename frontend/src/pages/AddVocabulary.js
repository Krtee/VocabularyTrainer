import "../style.css";
import React, {createRef} from "react";
import Navigation from "../components/Navigation";
import axios from "axios";


const AddVocabulary = () => {
    let textinput= createRef();

    function addVocab() {
        axios.post("http://localhost:4000/Vocab/insert",{
            language_id: 'de',
            english_word:textinput.current.value
        })
            .then(response=>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }

    return (
        <div id="content" className="add_vocabulary">
            <Navigation/>
            <form>
                <h1>Add vocabulary</h1>
                <h2>Enter the new word</h2>
                <div className="form-group row">
                    <label className="col-lg-3 col-12 no_padding_left" htmlFor="add_vocabulary_english">
                        English
                    </label>
                    <input
                        type="text"
                        className="form-control col-lg-9 col-12"
                        id="add_vocabulary_english"
                        placeholder="type in English word"
                        ref={textinput}
                    />
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-12 no_padding_left" htmlFor="add_vocabulary_english">
                        Foreign
                    </label>
                    <input
                        type="text"
                        className="form-control col-lg-9 col-12"
                        id="add_vocabulary_english"
                        placeholder="type in Forein language word"
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={addVocab}>
                    Add vocabulary
                </button>
            </form>
        </div>
    );
}

export default AddVocabulary;
