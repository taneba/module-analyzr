import defaultExport from "test-module";
import * as name from "test-module";
import { export as alias } from "test-module";

import { export1, export2 } from "test-module";
import { export3 } from "test-module";

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

// class
class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);