<script lang='ts'>
	import { type Config, type Connector } from "@wagmi/core"
	import { createConnector } from "../../lib/createConncetor"

    export let theme="dark"
		export let connector: Connector

		interface connectorProps {
			connector: Connector

		}

		const {
			elements: {connect}
		} = createConnector(connector)

</script>

<button use:connect class={theme}>
	{connector.name}
	<img class="logo" src={connector.icon} alt={connector.name}>
</button>

<style>
  button {
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;

    margin: 10px;
    border: none;
    padding: 20px 16px;

    flex: none;
    align-self: stretch;
    font-weight: 600;
    margin: .25em;
    border-radius: 16px;

    transition: all 0.125s ease;
		
		& img {
			width: auto;
			height: 2.25em;
			border-radius: 8px;
		}
}

button.dark {
    background-color: #222429;
    color: #f1f1f1;
    font-size: 1em;
}
button.dark:hover {
    background-color: #2F3139;
}  

/* button.dark:focus {
    outline: transparent;
    outline-style: solid;
    box-shadow: 0 0 0 2px #1aa3e2;
} */

button.dark:active {
    scale: 99%;
    background-color: #2F3139;
}

</style>
