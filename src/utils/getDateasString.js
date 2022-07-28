export default function () {
    let date = new Date();
    return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].join("-");
}