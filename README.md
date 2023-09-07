# 🖼 Gen Art | Generative-JS 🎨🖌 

Uma coletânea de desenhos vetoriais gerados dinamicamente a partir de parâmetros definidos pelo usuário

![sketches](https://user-images.githubusercontent.com/2355303/216742047-6936ee71-7a5e-41a4-bc2b-28b9ce8e0f05.gif)


---

## Servindo localmente os arquivos

1. Clone o repositório com `git clone https://github.com/Pitossomo/generative-js.git`

2. No diretório criado, instale as dependências com `npm install`

3. Inicie o servidor local com `npm run dev`

4. Abra [http://localhost:3000](http://localhost:3000) com o navegador para ver os resultados.

## Incluindo novas artes

1. No arquivo `sketchesMetadata.ts`, na raíz do projeto, adicione na variável `SKETCHES` um objeto com os elementos de input que aparecerão na tela, conforme os exemplos já existentes.

2. Na pasta `src/components/sketchs` crie uma pasta para a nova arte, conforme modelos existentes

3. Na pasta da nova arte, crie pelo menos um arquivo p.ex. `src/components/sketchs/NovaArte/NovaArte.tsx` contendo os métodos `setup` e `draw`
  - O método `setup` irá inicializar os inputs e o canvas
  - O método `draw` irá atualizar o desenho que aparece na tela conforme o valor dos inputs a cada atualização da tela