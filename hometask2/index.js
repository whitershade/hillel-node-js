const { EventEmitter } = require('events');
const consoleLog = require('../hometask1/utils/consoleLog');

class Student extends EventEmitter {
  constructor(name = '', surname = '', yearOfBirth = 0) {
    super();
    process.nextTick(() => this.emit('created'));

    this.name = name;
    this.surname = surname;
    this.yearOfBirth = yearOfBirth;
    this.attendanceAndGrades = Array(12);

    this.setUpListeners();
    this.checkIfOuterListenersExist();
  }

  setUpListeners() {
    this.listenOnceToGetAge();
    this.listenToSetPresent();
    this.listenToSetPoint();
    this.listenToAveragePoint();
    this.listenToMaxPoint();
  }

  listenOnceToGetAge() {
    const age = new Date().getFullYear() - this.yearOfBirth;

    this.once('getUserAge', () => this.emit('userAge', age));
  }

  listenToSetPresent() {
    this.on('present', (isPresent) => {
      const indexOfFirstUnattended = this.attendanceAndGrades.findIndex(attendance => attendance === undefined);

      if (indexOfFirstUnattended === -1) throw new Error('Attendance list is full');

      this.attendanceAndGrades[indexOfFirstUnattended] = { isPresent };
    });
  }

  listenToSetPoint() {
    this.on('point', (point) => {
      const lastIndexOfAttended = this.attendanceAndGrades
        .reverse()
        .findIndex(attendance => attendance !== undefined);

      if (lastIndexOfAttended === -1) throw new Error('No attendance provided to add point');

      this.attendanceAndGrades[lastIndexOfAttended].point = point;
    });
  }

  listenToAveragePoint() {
    this.on('averagePoint', callback => callback(this.getAveragePoint()));
  }

  listenToMaxPoint() {
    this.on('maxPoint', callback => callback(this.getMaxPoint()));
  }

  getAveragePoint() {
    const { total: totalGrade, count: countOfGrades } = this.attendanceAndGrades.reduce(
      (result, { point }) => {
        if (point !== 0 && !point) return result;

        return {
          total: result.total + point,
          count: result.count + 1,
        };
      },
      { total: 0, count: 0 },
    );

    if (countOfGrades === 0) return 0;

    return Number((totalGrade / countOfGrades).toFixed(2));
  }

  getMaxPoint() {
    return this.attendanceAndGrades.reduce(
      (maxPoint, { point = 0 }) => (point > maxPoint ? point : maxPoint),
      0,
    );
  }

  checkIfOuterListenersExist() {
    setTimeout(() => {
      if (this.listenerCount('created') === 0) this.emit('check', `${this.name} ${this.surname}`);
    }, 1000);
  }
}

const firstStudent = new Student('Oxxxy', 'Miron', 1985);
const secondStudent = new Student('Lana', 'Rhoades', 1996);

const log = message => answer => consoleLog(`${message} ${answer}`);

firstStudent.on('created', () => {
  consoleLog('created first student');

  // some bullshit for testing
  firstStudent.on('userAge', log('Student age is:'));
  firstStudent.emit('getUserAge');
  firstStudent.emit('getUserAge');
  firstStudent.emit('present', true);
  firstStudent.emit('present', true);
  firstStudent.emit('point', 5);
  firstStudent.emit('present', true);
  firstStudent.emit('point', 4);
  firstStudent.emit('present', true);
  firstStudent.emit('point', 5);
  firstStudent.emit('present', true);
  firstStudent.emit('averagePoint', log('average point is:'));
  firstStudent.emit('maxPoint', log('max point is:'));
});

const nobodyListensToMe = student => consoleLog(`${student} says: nobody listens to me :c`, 'red');
firstStudent.on('check', nobodyListensToMe);
secondStudent.on('check', nobodyListensToMe);
