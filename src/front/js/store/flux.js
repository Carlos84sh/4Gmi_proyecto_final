const baseUrl = "https://3001-e6c24093-e657-4630-bdff-9f131f2505fc.ws-eu03.gitpod.io/api";

const cityPopulationURL = null; //LA API DEL INE ES UN CAOS
const weatherCity = null; // en https://www.el-tiempo.net/api tenemos toda lo relacionado con tiempo, es más facil que la del ine
//
const token = localStorage.getItem("token");
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			favorites: [],
			posts: [],
			cities: []
		},
		actions: {
			newUser(data, callback) {
				const endpoint = `${baseUrl}/users`;
				const config = {
					method: "POST",
					body: JSON.stringify({
						user_name: data.username,
						first_name: data.firstName,
						last_name: data.lastName,
						email: data.email,
						country: data.country,
						languages: data.languages,
						password: data.password,
						active: true,
						avatar: null
					}),
					headers: {
						"Content-Type": "application/json"
					}
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						//creo que acá debemos crear un store de users.. es por eso que después de crear sergio decía derivarlo a login y no a home?
						console.log(data, "usuario creado");
						callback();
					});
			},

			login(data, callback) {
				const actions = getActions();
				const endpoint = `${baseUrl}/login`;
				const config = {
					method: "POST",
					body: JSON.stringify({
						email: data.email,
						password: data.password
					}),
					headers: {
						"Content-Type": "application/json"
					}
				};

				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						setStore({ token: data.token });
						actions.test();
						callback();
					});
			},

			logOut() {
				localStorage.removeItem("token");
				setStore({ token: null });
			},

			addFav(item) {
				const store = getStore();
				if (store.favorites.includes(item) == true) {
					let newList = store.favorites.filter((element, index) => {
						return element != item;
					});
					setStore({ favorites: newList });
				} else {
					const newList = [...store.favorites];
					newList.push(item);
					setStore({ favorites: newList });
				}
			},

			deleteFav(item) {
				const store = getStore();
				let newList = store.favorites.filter(element => {
					return element != item;
				});
				setStore({ favorites: newList });
			},

			getAllCities() {
				const store = getStore();
				const endpoint = `${baseUrl}/cities`;
				const config = {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						console.log("cities", data);
						setStore({ cities: data });
					});
			},

			postCity(id) {
				const endpoint = `${baseUrl}/cities/${id}/posts`;
				const config = {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						setStore({ posts: data });
					});
			},

			// Creo que test se puede borrar
			test() {
				const store = getStore();
				const endpoint = `${baseUrl}/test`;
				const config = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${store.token}`
					}
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => console.log(data, "este es el test"));
			}
		}
	};
};

export default getState;
