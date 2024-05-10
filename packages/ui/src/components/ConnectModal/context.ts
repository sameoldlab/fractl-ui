import type { Connector } from '@fractl-ui/types'
import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

type Page = 'main' | 'explainer' | { connecting: Connector }
type Context = Writable<Page>

export function setPage() {
	const current = writable<Page>('main')
	setContext('current', current)
}

export function getPage() {
	return getContext<Context>('current')
}
