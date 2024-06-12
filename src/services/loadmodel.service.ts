import * as tf from "@tensorflow/tfjs-node"

export const loadModel = async () => {
    return tf.loadGraphModel("https://storage.googleapis.com/image-capstone-acnetify/model/model.json")
}
