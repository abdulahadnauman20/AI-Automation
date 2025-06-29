"use strict";

const MAX_CALLS_PER_MINUTE = 200;
let callsThisMinute = 0;
let queue = [];
let isProcessing = false;

// Reset the call count every minute
setInterval(() => {
  callsThisMinute = 0;
  processQueue();
}, 60 * 1000);

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;
  try {
    while (callsThisMinute < MAX_CALLS_PER_MINUTE && queue.length > 0) {
      const { job, resolve, reject } = queue.shift();
      try {
        const result = await job();
        resolve(result);
      } catch (err) {
        reject(err);
      }
      callsThisMinute++;
    }
  } finally {
    isProcessing = false;
  }
}

function enqueueApolloJob(job) {
  return new Promise((resolve, reject) => {
    queue.push({ job, resolve, reject });
    processQueue();
  });
}

module.exports = {
  enqueueApolloJob,
}; 