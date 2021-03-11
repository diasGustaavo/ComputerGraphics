//  Implemente o algoritmo QuickSort.

quickSort = (myArray, start, end) => {
    let pivot
    if(end > start){
        pivot = split(myArray, start, end)
        quickSort(myArray, start, pivot - 1)
        quickSort(myArray, pivot + 1, end)
    }
}

split = (myArray, start, end) => {
    let left, right, pivot, aux
    pivot = myArray[start] 
    left = start
    right = end

    while(left < right) {
        while(myArray[left] <= pivot){
            left = left + 1
        }
        while(myArray[right] > pivot){
            right = right - 1
        }
        if(left < right){
            aux = myArray[left]
            myArray[left] = myArray[right]
            myArray[right] = aux
        }
    }

    myArray[start] = myArray[right]
    myArray[right] = pivot
    return right
}

const testArray = [9, 4, 4, 3, 6, 5, 8, 7, 2, 1]
console.log("array before quickSort:", testArray)
quickSort(testArray, 0, 9)
console.log("array after quickSort:", testArray)