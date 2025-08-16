
# LocalAuthApp 🔐

Aplicativo **React Native com Expo SDK 51** que implementa **autenticação biométrica** (Face ID, Touch ID, impressão digital) e **armazenamento seguro** com **Expo Secure Store**.

## 📱 Funcionalidades

* Autenticação biométrica (Face ID, Touch ID, impressão digital)
* Armazenamento seguro criptografado
* Interface moderna com animações
* Código em TypeScript
* Arquitetura escalável e organizada
* Funciona em iOS e Android
* Configuração simples e rápida

## 🚀 Tecnologias

React Native, Expo SDK 51, TypeScript, React Navigation, Expo Local Authentication, Expo Secure Store.

## ⚙️ Instalação

1. Clone o repositório
2. Instale dependências (`npm install` e `npx expo install`)
3. Inicie o projeto (`npx expo start`)
4. Teste no dispositivo físico (Expo Go).

## 📂 Estrutura

Organização em `components`, `screens`, `services`, `hooks`, `types`, `constants`, `navigation`, além de `assets` e `App.tsx`.

## 🔒 Segurança

* Dados sensíveis salvos com **expo-secure-store** (criptografia nativa)
* APIs de biometria nativas do dispositivo
* Fallback para senha do sistema quando disponível

## 🐛 Problemas Comuns

* Biometria não suportada → verificar dispositivo físico
* Nenhum método cadastrado → configurar Face ID/Touch ID/Impressão digital
* Simulador não suporta biometria (usar dispositivo real).

## 📄 Licença

MIT.


