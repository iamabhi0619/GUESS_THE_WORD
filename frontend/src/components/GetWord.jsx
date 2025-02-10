import React from 'react';

function GetWord() {
    const handleClick = async () => {
        const progres = JSON.parse(localStorage.getItem('progres'));
        console.log(JSON.stringify(progres));
        try {
            const response = await fetch('/api/word', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(progres),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data.word);
            localStorage.setItem('question', JSON.stringify(data.question));
            localStorage.setItem('progres', JSON.stringify(data.newdata));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    return (
        <div>
            GetWord
            <button onClick={handleClick}>
                Get New Word
            </button>
        </div>
    );
}

export default GetWord;
