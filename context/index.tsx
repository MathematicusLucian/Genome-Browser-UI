import React from 'react';

const { createContext, useContext, useState } = React;

export const ThemeContext = createContext(null);
export const DrawerContext = createContext(null);
export const ModalContext = createContext(null);