export function convertGrade(desired: string) {
  switch (desired) {
    case "1": {
      const storedValue = localStorage.getItem("one");
      if (storedValue !== null) {
        return storedValue;
      }
      break;
    }
    case "2": {
      const storedValue = localStorage.getItem("two");
      if (storedValue !== null) {
        return storedValue;
      }
      break;
    }
    case "3": {
      const storedValue = localStorage.getItem("three");
      if (storedValue !== null) {
        return storedValue;
      }
      break;
    }
    case "4": {
      const storedValue = localStorage.getItem("four");
      if (storedValue !== null) {
        return storedValue;
      }
      break;
    }
    case "5": {
      const storedValue = localStorage.getItem("five");
      if (storedValue !== null) {
        return storedValue;
      }
      break;
    }
  }
}
