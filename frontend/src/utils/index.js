// we are importing the surpriseMePrompts array, which has random things to search for our AI images
import { surpriseMePrompts } from '../constants';


import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
    // this will give us the random index from that surpriseMePrompts array
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    // store the value at that index in that array
    const randomPrompt = surpriseMePrompts[randomIndex];

    // if in any case the value of randomPrompt is same as the previous randomPrompt value,
    // then call the function again.
    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}



export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}


