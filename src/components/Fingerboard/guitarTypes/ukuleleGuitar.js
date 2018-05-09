import React from 'react';

const ukuleleGuitar = props => {
    const { strings, guitarNeck, frets } = props;
    const dotsOne = [5, 9, 11];

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

                    const dot = dotsOne.includes(index) ? 'dot' : '';

                    return (
                        <div className={`fret-line f${index} ${dot}`} key={index} />
                    )
                })
            }


            {
                strings.map((_, index) => {
                    const classBassAdd = `string s${index + 1}`;
                    return <div className={classBassAdd} key={index} />
                })
            }

        </div>
    )
}
export default ukuleleGuitar