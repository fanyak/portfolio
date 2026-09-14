import { expect, test } from "vitest";
// import { sum } from './sum.js'

function codeParse(codeString) {
	const regex =
		/\bdef\b|(?<=\bdef\s+)[A-Za-z_]\w*|\breturn\b|\bfor\b|\bin\b|<=|=>|==|>|<|\d+/g;
	const spans = codeString.split("\n").map((s) => {
		const span = document.createElement("span");
		// const equal_signs = Array.from(s.matchAll(/=+/g))
		const matches = Array.from(s.matchAll(regex));
		let current_index = 0;
		for (let m of matches) {
			const match = m[0];
			console.log(match, m.index);
			const match_span = document.createElement("span");
			match_span.textContent = match;
			match_span.classList.add("equal_sign");
			const text_node = document.createTextNode(
				s.substring(current_index, m.index),
			);
			span.appendChild(text_node);
			span.appendChild(match_span);
			current_index = m.index + match.length;
		}
		const final_text_node = document.createTextNode(s.substring(current_index));
		span.appendChild(final_text_node);
		return span;
	});
	return spans;
}

test("code parse", () => {
	const s = `return np.sqrt(np.mean((predictions - true.values)**2, axis = 1) )`;
	// const res = [<span><span class="equal_sign">return</span>np.sqrt(np.mean((predictions - true.values)**<span class="equal_sign">2</span>, axis =<span
	//     class="equal_sign"> 1</span> ) )</span>]
	expect(codeParse(s)).toBeTruthy();
});
