import occtimportjs from "occt-import-js";
import occtwasm from '../../node_modules/occt-import-js/dist/occt-import-js.wasm?url'

onmessage = async function (ev)
{
	let modulOverrides = {
		locateFile: function () {
			return occtwasm;
		}
	};
	let occt = await occtimportjs (modulOverrides);
	let result = occt.ReadFile (ev.data.format, ev.data.buffer, ev.data.params);
	postMessage (result);
};
