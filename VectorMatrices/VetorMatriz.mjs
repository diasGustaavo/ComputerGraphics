import Vector from './Vector.mjs'
import Matrix from './Matrix.mjs'


export const normaVetor = vector => Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2))

export const crossProduct = (vetor1, vetor2) => [(vetor1[1]* vetor2[2]) - (vetor1[2]* vetor2[1]), 
(vetor1[2]* vetor2[0]) - (vetor1[0]* vetor2[2]),
(vetor1[0]* vetor2[1]) - (vetor1[1]* vetor2[0])]

export const dotProduct = (vetor1, vetor2) => (vetor1[0] * vetor2[0]) +
(vetor1[1] * vetor2[1]) + (vetor1[2] * vetor2[2])

export const vectorMatrixProduct = (vector, matrix) => [(vector[0] * array[0][0]) + 
    (vector[1] * array[0][1]) + (vector[2] * array[0][2]),
    (vector[0] * array[1][0]) + (vector[1] * array[1][1]) +
    (vector[2] * array[1][2]),
    (vector[0] * array[2][0]) + (vector[1] * array[2][1]) + 
    (vector[2] * array[2][2])
]

export const matrixMatrixProduct = (matrix1, matrix2) => [
    [
        (matrix1[0][0] * matrix2[0][0]) + (matrix1[0][1] * matrix2[1][0]) + (matrix1[0][2] * matrix2[2][0]),
        (matrix1[0][0] * matrix2[0][1]) + (matrix1[0][1] * matrix2[1][1]) + (matrix1[0][2] * matrix2[2][1]),
        (matrix1[0][0] * matrix2[0][2]) + (matrix1[0][1] * matrix2[1][2]) + (matrix1[0][2] * matrix2[2][2])
    ],
    [
        (matrix1[1][0] * matrix2[0][0]) + (matrix1[1][1] * matrix2[1][0]) + (matrix1[1][2] * matrix2[2][0]),
        (matrix1[1][0] * matrix2[0][1]) + (matrix1[1][1] * matrix2[1][1]) + (matrix1[1][2] * matrix2[2][1]),
        (matrix1[1][0] * matrix2[0][2]) + (matrix1[1][1] * matrix2[1][2]) + (matrix1[1][2] * matrix2[2][2])
    ],
    [
        (matrix1[2][0] * matrix2[0][0]) + (matrix1[2][1] * matrix2[1][0]) + (matrix1[2][2] * matrix2[2][0]),
        (matrix1[2][0] * matrix2[0][1]) + (matrix1[2][1] * matrix2[1][1]) + (matrix1[2][2] * matrix2[2][1]),
        (matrix1[2][0] * matrix2[0][2]) + (matrix1[2][1] * matrix2[1][2]) + (matrix1[2][2] * matrix2[2][2])
    ]
]

export const matrixDeterminant = matrix => ((matrix[0][0] * matrix[2][2] * matrix[1][1]) + 
    (matrix[0][1] * matrix[1][2] * matrix[2][0]) +
    (matrix[0][2] * matrix[1][0] * matrix[2][1]) -
    (matrix[0][2] * matrix[1][1] * matrix[2][0]) -
    (matrix[0][1] * matrix[1][0] * matrix[2][2]) -
    (matrix[0][0] * matrix[1][2] * matrix[2][1])
)

export const vector = Vector(4, 6, -2)
export const vector2 = Vector(2, 1, -5)
export const array = Matrix(-5, -2, 3,
                     4, 5, -656,
                     7, 8, 9)

export const array2 = Matrix(9, 8, 7,
                     6, -555, 4,
                     -3, 2, 1111)

console.log(normaVetor(vector))
console.log(vector[0])
console.log(crossProduct(vector, vector2))
console.log(dotProduct(vector, vector2))
console.log(vectorMatrixProduct(vector, array))
console.log(matrixMatrixProduct(array, array2))
console.log(matrixDeterminant(array2))