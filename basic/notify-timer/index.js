import notifier from "node-notifier";

const notifyTimer = (tick) => {
  console.log(tick);

  const timerId = setTimeout(() => {
    if (tick === 1) {
      console.log("Notify!");

      clearTimeout(timerId);

      notifier.notify({
        title: "Пора остановиться",
        message: "Время вышло",
      });

      return;
    }

    const nextTick = tick - 1;

    notifyTimer(nextTick);
  }, 1000);
};

const [count] = process.argv.slice(2);

notifyTimer(count);
