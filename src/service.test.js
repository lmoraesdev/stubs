const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert")
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";
const mocks = {
	tatooine: require("./mocks/tatooine.json"),
	alderaan: require("./mocks/alderaan.json"),
};

(async () => {
	/* Calling the service.makeRequest method without stubbing it. */
	// {
	// 	const service = new Service()
	// 	const withoutStub = await service.makeRequest(BASE_URL_2)
	// 	console.log(JSON.stringify(withoutStub))
	// }
	const service = new Service();
	const stub = sinon.stub(service, service.makeRequest.name);

	/* Stubbing the makeRequest method with the given arguments and returning the given
response. */
	stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
	stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

	/* Calling the stubbed method. */
	// {
	// 	const response = await service.makeRequest(BASE_URL_1)
	// 	console.log('response', response)
	// }

	{
		const expected = {
			name: "Tatooine",
			surface_water: "1",
			apperedIn: 5,
		};
		const results = await service.getPlanents(BASE_URL_1)
		deepStrictEqual(results, expected)
	}

	{
		const expected = {
			name: "Alderaan",
			surface_water: "40",
			apperedIn: 2,
		};
				const results = await service.getPlanents(BASE_URL_2);
				deepStrictEqual(results, expected);
	}
})();
