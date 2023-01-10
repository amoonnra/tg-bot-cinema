import { appendCollections, appendPopulars, appendPremiers } from "api/filmbase.api"

(async function() {
	await appendPremiers()
	await appendPopulars()
	await appendCollections()
})()
