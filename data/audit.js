const logs = [];

function addLog(log) {
    logs.push({
        id: logs.length + 1,
        timestamp: new Date(),
        ...log
    });
}

module.exports = {
    logs,
    addLog
};