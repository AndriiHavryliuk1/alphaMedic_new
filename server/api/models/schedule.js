
class Schedule {
    constructor(schedule = {}) {
        this.monday = {
            startDateTime: schedule.startDate || "10:00",
            endDateTime: schedule.endDate || "19:00"
        };
        this.tuesday = {
            startDateTime: schedule.startDate || "10:00",
            endDateTime: schedule.endDate || "19:00"
        };
        this.wednesday = {
            startDateTime: schedule.startDate || "10:00",
            endDateTime: schedule.endDate || "19:00"
        };
        this.thursday = {
            startDateTime: schedule.startDate || "10:00",
            endDateTime: schedule.endDate || "19:00"
        };
        this.friday = {
            startDateTime: schedule.startDate || "10:00",
            endDateTime: schedule.endDate || "19:00"
        };
        this.saturday = {
            startDateTime: schedule.startDate || "10:00",
            endDateTime: schedule.endDate || "15:00"
        };
        this.sunday = {
            startDateTime: schedule.startDate || null,
            endDateTime: schedule.endDate || null
        };
    }
}

module.exports = Schedule;
