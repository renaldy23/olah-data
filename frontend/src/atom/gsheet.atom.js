import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

export const gsheetAtom = atomWithStorage("gsheet", {});
export const gsheetLinkAtom = atomWithStorage('gsheetLink', '')
export const tokenKey = atomWithStorage('tokenKey', '')