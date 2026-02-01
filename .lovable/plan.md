
# Plano: Adicionar 6 novas imagens na galeria de projetos

## Resumo
Adicionar 6 novas imagens externas como as primeiras da galeria "CONFIRA ALGUNS PROJETOS". As novas imagens serão exibidas antes das imagens existentes.

## O que será feito

### Modificação no arquivo `src/components/Projects.tsx`

1. **Adicionar as 6 novas URLs de imagens** no início do array `projects`:
   - `https://i.postimg.cc/3JByHjMr/1.png`
   - `https://i.postimg.cc/qBGBtk15/2.png`
   - `https://i.postimg.cc/dVgJMD0J/3.png`
   - `https://i.postimg.cc/zBFNRjFR/4.png`
   - `https://i.postimg.cc/c4HWrfgv/5.png`
   - `https://i.postimg.cc/8C8gK3y4/6.png`
https://i.postimg.cc/q7cSm76k/8.png
https://i.postimg.cc/65GHjQFY/9.png

2. **Reorganizar o array `projects`** para que as 6 novas imagens apareçam primeiro, seguidas das 10 imagens existentes (total: 16 imagens)

## Detalhes técnicos

O código atual usa imports locais para as imagens. As novas imagens serão adicionadas como URLs externas diretamente no array:

```typescript
const newProjects = [
  "https://i.postimg.cc/3JByHjMr/1.png",
  "https://i.postimg.cc/qBGBtk15/2.png",
  "https://i.postimg.cc/dVgJMD0J/3.png",
  "https://i.postimg.cc/zBFNRjFR/4.png",
  "https://i.postimg.cc/c4HWrfgv/5.png",
  "https://i.postimg.cc/8C8gK3y4/6.png",
];

const projects = [
  ...newProjects,
  project1, project2, project3, project4, project5, 
  project6, project7, project8, project9, project10
];
```

## Resultado esperado

A galeria terá 16 imagens no total, com as 6 novas imagens aparecendo primeiro na ordem da galeria.
