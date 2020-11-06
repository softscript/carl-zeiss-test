function getMiniMaxSum(dataArray, n) {
  
    if(dataArray.length < n){
      const res = "Number of array element should be greater than cunt"
      console.log("res- ", res)
      return res
    }
    
    const limiter = dataArray.length - n
    dataArray.sort();
    const minSum = getSum(dataArray.slice(0, -limiter))
    const maxSum = getSum(dataArray.slice(limiter))
    const res = `Min = ${ minSum } and Max = ${maxSum}`
    console.log(res)
    return res
  }
  
  function getSum(subDataArray) {
    return subDataArray.reduce(function(a, b) {
      return a + b;
    }, 0);
  }
  
  getMiniMaxSum([1], 2)
  getMiniMaxSum([1, 4, 2, 5, 3], 2)
  getMiniMaxSum([2, 3, 4, 1, 3], 2)
  getMiniMaxSum([100, 102, 101, 103, 104], 2)