function isPrime(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid input'
  }

  if (num < 2) return false

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
      return false
    }
  }

  return true
}
module.exports = isPrime
