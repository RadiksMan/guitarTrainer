import React from 'react';

const bassGuitar = props => {
    const { strings, guitarNeck, frets } = props;
    console.log('frets', frets)
    const dotsOne = [3, 5, 7, 9, 15,17,19];
    const dotsTwo = [12];

    return (
        <div
            className={guitarNeck}
        >
            {
                frets.map((fret, index) => {

                    const classFretName = `fret f${index}`;
                    var notesForEach = [];

                    Object.keys(fret).forEach((key) => {

                        const { note } = fret[key];
                        const classNotesName = `note n${key} ${note.toLowerCase()}`;

                        notesForEach.push(
                            <div key={key} className={classNotesName}>
                                <span>{note}</span>
                            </div>
                        );
                    })

                    return (
                        <div
                            className={classFretName}
                            key={index}
                        >
                            {notesForEach}
                        </div>
                    )
                })
            }


            {
                frets.map((_, index) => {

                    const dot = dotsOne.includes(index) ? 'dot' : dotsTwo.includes(index) ? 'two-dots' : '';

                    return (
                        <div className={`fret-line f${index} ${dot}`} key={index} />
                    )
                })
            }


            {
                strings.map((_, index) => {
                    const bass = index > 2 ? 'bass' : '';
                    const classBassAdd = `string s${index + 1} ${bass}`;

                    return <div className={classBassAdd} key={index} />
                })
            }

        </div>
    )
}
export default bassGuitar