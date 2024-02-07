import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faVolumeHigh, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


function Quote() {

    const [randomQuote, setRandomQuote] = useState("");
    const [randomAuthor, setRandomAuthor] = useState("");

    const getRandomQuote = () => {
        fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(result => {
            setRandomQuote(result.content);
            setRandomAuthor(result.author);
            console.log(result);
        });
    };

    const copy = () => {
        navigator.clipboard.writeText(randomQuote)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukces!',
                    text: 'Cytat został skopiowany do schowka.'
                });
            })
            .catch((error) => {
                console.error('Błąd podczas kopiowania do schowka:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: 'Wystąpił błąd podczas kopiowania do schowka.'
                });
            });
    };
    
    const textToSpeech = () => {
        const tts = new SpeechSynthesisUtterance(randomQuote);
        const synth = window.speechSynthesis;
        synth.speak(tts);
    };
    

    return(
            <>
                <div className="main-container">
                    <div className="quote-fragment">
                        <h1 className="qotd">Quote of the Day</h1>
                        <div className="quote-area">
                            <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon-left" />
                            <p className="quote" id="quote">{randomQuote}</p>
                            <FontAwesomeIcon icon={faQuoteRight} className="quote-icon-right"/>
                        </div>
                        <div className="author">
                            <span>__</span>
                            <p className="credits">{randomAuthor}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="buttons">
                        <button className="tts" onClick={textToSpeech}><FontAwesomeIcon icon={faVolumeHigh} /></button>
                        <button className="copy" onClick={copy}><FontAwesomeIcon icon={faCopy} /></button>
                        <button className="new-quote" onClick={getRandomQuote}>New Quote</button>
                    </div>
                </div>
            </>
    )
}

export default Quote