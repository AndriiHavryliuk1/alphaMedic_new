class MyStaticClass {

    static incrementCount () {
        const currentDate = Date.now();
        if (!MyStaticClass.firstCallTime || (MyStaticClass.firstCallTime && currentDate - MyStaticClass.firstCallTime > 30000)) {
            MyStaticClass.firstCallTime = currentDate;
            MyStaticClass.currentCallsCount = 0;
        }
        MyStaticClass.lastCallTime = currentDate;
        MyStaticClass.currentCallsCount++;
        MyStaticClass.counter++;
    }

    static resetCount () {
        MyStaticClass.counter = 0;
    }

    static getCount() {
        return MyStaticClass.counter;
    }

    static isValid() {
        return !!(MyStaticClass.currentCallsCount <= MyStaticClass.maxCallsCount)
    }

}

MyStaticClass.maxCallsCount = 10;
MyStaticClass.currentCallsCount = 0;


module.exports = MyStaticClass;

