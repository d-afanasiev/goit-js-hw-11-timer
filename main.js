class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(`${selector}`);
    this.targetDate = targetDate;

    this.timer();
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimerComponents(time) {
    const total = time;
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { total, days, hours, mins, secs };
  }

  timer() {
    const startTime = this.targetDate;

    let timeInterval = setInterval(() => {
      const currentTime = Date.now();
      const time = this.getTimerComponents(startTime - currentTime);
      if (time.total <= 0) {
        clearInterval(timeInterval);
        return;
      }
      const arrayContainer = [...this.selector.children];
      arrayContainer.map((el) => {
        switch (el.firstElementChild.dataset.value) {
          case "days":
            el.firstElementChild.textContent = time.days;
            break;
          case "hours":
            el.firstElementChild.textContent = time.hours;
            break;
          case "mins":
            el.firstElementChild.textContent = time.mins;
            break;
          case "secs":
            el.firstElementChild.textContent = time.secs;
            break;
        }
      });
    }, 1000);
  }
}

const newTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021"),
});
