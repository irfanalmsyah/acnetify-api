import * as tf from '@tensorflow/tfjs-node';

export const loadModel = async () => {
    return tf.loadGraphModel('https://storage.googleapis.com/submissionmlgc-rahmadilham/submissions-model/model.json');
};
