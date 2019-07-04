const os = require("os")
	, exec = require("child_process").exec;

function ping(host) {
	return new Promise((resolve, reject) => {
		const command = (os.platform() === "win32") ? `ping ${host} -n 1` : `ping ${host} -c 1`;
		exec(command, (err, stdout, stderr) => {
			if (err) return resolve(false);
			if (stderr) return resolve(false);
			resolve(/[0-9.]+ ms/gm.exec(stdout.trim().replace("\r", "").split("\n")[1])[0].replace(" ms", ""));
		});
	});
}

module.exports = ping;
