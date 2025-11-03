# Guía de Diseño Edge-to-Edge - Wallet Zae

**Fecha:** 3 de Noviembre, 2025
**Objetivo:** Crear un diseño consistente y edge-to-edge en toda la aplicación móvil

---

## PROBLEMA IDENTIFICADO

Tu diseño NO estaba edge-to-edge porque:

1. **Padding inconsistente**: Algunas páginas usaban `px-3` (12px), otras `px-4` (16px), otras `px-6` (24px)
2. **Faltaba `w-full`**: Muchos elementos no tenían ancho completo
3. **Márgenes negativos desbalanceados**: Los botones del header tenían `-ml-1` y `-mr-1` que no compensaban bien el padding de `px-3`
4. **Contenedores sin full width**: Divs principales sin `w-full`

---

## SOLUCIÓN APLICADA

### 1. **Padding Consistente: `px-4` (16px)**

El estándar de iOS y Android es **16px de padding lateral**. Esto:
- Da espacio suficiente para que el contenido respire
- No está ni muy pegado (px-2) ni muy separado (px-6)
- Es el estándar de Material Design y Human Interface Guidelines

```jsx
// ❌ ANTES (inconsistente)
<div className="px-3">  // 12px
<div className="px-6">  // 24px

// ✅ AHORA (consistente)
<div className="px-4">  // 16px - estándar mobile
```

### 2. **Ancho Completo: `w-full`**

Todos los contenedores principales deben tener `w-full` para aprovechar todo el ancho disponible:

```jsx
// ❌ ANTES
<div className="bg-[#1C1C1E] px-3">

// ✅ AHORA
<div className="w-full bg-[#1C1C1E] px-4">
```

### 3. **Márgenes Negativos Balanceados**

Para que los botones del header lleguen al borde, ajustamos los márgenes negativos:

```jsx
// ❌ ANTES (con px-3)
<button className="w-10 h-10 -ml-1">  // Solo compensa 4px

// ✅ AHORA (con px-4)
<button className="w-10 h-10 -ml-2">  // Compensa 8px (la mitad del padding)
```

---

## CAMBIOS APLICADOS EN DASHBOARD.JSX

### ANTES vs DESPUÉS

#### 1. Header
```jsx
// ❌ ANTES
<div className="bg-[#1C1C1E] px-3 pt-14 pb-4 flex items-center justify-between">
  <button className="w-10 h-10 flex items-center justify-center -ml-1">

// ✅ DESPUÉS
<div className="w-full bg-[#1C1C1E] px-4 pt-14 pb-4 flex items-center justify-between">
  <button className="w-10 h-10 flex items-center justify-center -ml-2">
```

**Cambios:**
- ✅ Agregado `w-full` al contenedor
- ✅ Cambiado `px-3` → `px-4`
- ✅ Cambiado `-ml-1` → `-ml-2` (balancea mejor el padding)
- ✅ Cambiado `-mr-1` → `-mr-2`

#### 2. Tabs
```jsx
// ❌ ANTES
<div className="bg-[#1C1C1E] px-3">
  <div className="flex gap-8 border-b border-gray-800">

// ✅ DESPUÉS
<div className="w-full bg-[#1C1C1E] px-4">
  <div className="w-full flex gap-8 border-b border-gray-800">
```

**Cambios:**
- ✅ Agregado `w-full` a ambos divs
- ✅ Cambiado `px-3` → `px-4`

#### 3. Contenido Principal
```jsx
// ❌ ANTES
<div className="px-3 pt-5">
  <div className="flex items-center justify-between mb-3">

// ✅ DESPUÉS
<div className="w-full px-4 pt-5">
  <div className="w-full flex items-center justify-between mb-3">
```

**Cambios:**
- ✅ Agregado `w-full` a todos los contenedores
- ✅ Cambiado `px-3` → `px-4`

#### 4. Grid de Cuentas
```jsx
// ❌ ANTES
<div className="grid grid-cols-3 gap-2 mb-3">

// ✅ DESPUÉS
<div className="w-full grid grid-cols-3 gap-2 mb-3">
```

**Cambios:**
- ✅ Agregado `w-full` para que el grid use todo el ancho disponible

#### 5. Secciones
```jsx
// ❌ ANTES
<div className="mb-3">
  <button className="w-full bg-[#2D2D2F] rounded-lg px-3 py-2.5 flex items-center justify-center gap-2">

// ✅ DESPUÉS
<div className="w-full mb-3">
  <button className="w-full bg-[#2D2D2F] rounded-lg px-3 py-2.5 flex items-center justify-center gap-2">
```

**Cambios:**
- ✅ Agregado `w-full` al contenedor padre

---

## REGLAS DE DISEÑO EDGE-TO-EDGE

### Regla 1: Contenedor Principal
```jsx
<div className="min-h-screen bg-[color] pb-20">
  {/* Contenido */}
</div>
```

### Regla 2: Header/Navigation
```jsx
{/* Header - EDGE TO EDGE con padding interno */}
<div className="w-full bg-[color] px-4 pt-14 pb-4 flex items-center justify-between">
  <button className="w-10 h-10 flex items-center justify-center -ml-2">
    {/* Icono izquierdo */}
  </button>

  <h1 className="text-white text-xl font-semibold">Título</h1>

  <button className="w-10 h-10 flex items-center justify-center -mr-2">
    {/* Icono derecho */}
  </button>
</div>
```

**Explicación:**
- `w-full`: Ancho completo
- `px-4`: Padding lateral estándar (16px)
- `-ml-2` y `-mr-2`: Compensan 8px para que los botones queden más pegados al borde

### Regla 3: Contenido con Padding
```jsx
{/* Contenido - PADDING CONSISTENTE px-4 */}
<div className="w-full px-4 pt-5">
  {/* Elementos internos */}
  <div className="w-full mb-3">
    {/* Contenido */}
  </div>
</div>
```

**Explicación:**
- Contenedor padre: `w-full px-4` (ancho completo con padding)
- Elementos hijos: `w-full` (usan todo el espacio del padre)

### Regla 4: Elementos Full-Width Dentro de Contenedores
```jsx
{/* Dentro de un contenedor con px-4 */}
<div className="w-full px-4">

  {/* Botón que debe usar todo el ancho disponible */}
  <button className="w-full bg-[color] rounded-lg px-3 py-2.5">
    Botón Full Width
  </button>

  {/* Grid que debe usar todo el ancho disponible */}
  <div className="w-full grid grid-cols-3 gap-2">
    {/* Items del grid */}
  </div>

</div>
```

### Regla 5: Scroll Horizontal (Pills/Cards)
```jsx
{/* Scroll horizontal - SIN padding en el contenedor de scroll */}
<div className="w-full flex gap-2 overflow-x-auto scrollbar-hide">
  <button className="flex items-center gap-1.5 bg-[color] rounded-full px-3 py-1.5 whitespace-nowrap">
    Pill 1
  </button>
  <button className="flex items-center gap-1.5 bg-[color] rounded-full px-3 py-1.5 whitespace-nowrap">
    Pill 2
  </button>
</div>
```

**Explicación:**
- `w-full`: Ancho completo
- `overflow-x-auto`: Permite scroll horizontal
- `scrollbar-hide`: Oculta la barra de scroll
- Items con `whitespace-nowrap`: No se rompen en múltiples líneas

### Regla 6: Bottom Navigation
```jsx
{/* Bottom Navigation - EDGE TO EDGE */}
<div className="fixed bottom-0 left-0 right-0 bg-[color] border-t border-gray-800 px-4 py-2">
  <div className="w-full flex items-center justify-around">
    {/* Botones de navegación */}
  </div>
</div>
```

**Explicación:**
- `fixed bottom-0 left-0 right-0`: Fijo en la parte inferior, edge-to-edge
- `px-4`: Padding interno consistente

---

## CÓMO APLICAR ESTOS CAMBIOS A OTRAS PÁGINAS

### Paso 1: Identificar el Padding Actual
Busca en el archivo:
```bash
grep -n "px-" src/pages/TuPagina.jsx
```

### Paso 2: Aplicar los Cambios

#### Para Login.jsx, Register.jsx (Páginas Centradas)
Estas páginas tienen formularios que se ven mejor centrados con `max-w` limited:

```jsx
// ✅ MANTENER ASÍ (está bien para formularios)
<div className="min-h-screen bg-dark-bg flex flex-col">
  <div className="flex-1 overflow-y-auto px-6 py-12">

    {/* Formulario centrado */}
    <form className="space-y-4 max-w-sm mx-auto">
      {/* Inputs */}
    </form>

  </div>
</div>
```

**PERO:** Cambiar `px-6` → `px-4` para consistencia en móviles pequeños:

```jsx
// ✅ MEJOR
<div className="flex-1 overflow-y-auto px-4 py-12">
```

#### Para Páginas con Listas (Transactions, Notifications, Settings)
Deben ser edge-to-edge:

```jsx
// ❌ ANTES
<div className="px-6 py-6">
  <h1>Título</h1>
  <div className="space-y-3">
    {/* Lista de items */}
  </div>
</div>

// ✅ DESPUÉS
<div className="w-full px-4 py-6">
  <h1 className="w-full">Título</h1>
  <div className="w-full space-y-3">
    {/* Lista de items */}
  </div>
</div>
```

#### Para AddTransaction.jsx, AddAccount.jsx
Ya tienen un diseño correcto con `px-4`:

```jsx
// ✅ YA ESTÁ BIEN (solo verificar que tenga w-full)
<div className="min-h-screen bg-[#1C1C1E]">
  <div className="bg-[#1C1C1E] px-4 pt-12 pb-4 flex items-center justify-between">
    {/* Header */}
  </div>

  <div className="px-4 py-6 space-y-6">
    {/* Contenido */}
  </div>
</div>
```

**Solo agregar `w-full`:**

```jsx
// ✅ MEJORADO
<div className="min-h-screen bg-[#1C1C1E]">
  <div className="w-full bg-[#1C1C1E] px-4 pt-12 pb-4 flex items-center justify-between">
    {/* Header */}
  </div>

  <div className="w-full px-4 py-6 space-y-6">
    {/* Contenido */}
  </div>
</div>
```

---

## CHECKLIST DE VERIFICACIÓN

Usa este checklist para cada página:

### Header/Navigation
- [ ] Contenedor tiene `w-full`
- [ ] Padding es `px-4`
- [ ] Botones izquierdo/derecho tienen `-ml-2` y `-mr-2`
- [ ] Altura de padding top es suficiente (pt-12 o pt-14 para safe area)

### Contenido Principal
- [ ] Contenedor principal tiene `w-full`
- [ ] Padding lateral es `px-4`
- [ ] Elementos hijos que deben ser full-width tienen `w-full`

### Grids y Listas
- [ ] Contenedor tiene `w-full`
- [ ] Grid tiene `w-full grid grid-cols-X`
- [ ] Items del grid NO tienen `w-full` (lo heredan del grid)

### Botones Full-Width
- [ ] Tienen `w-full` en className
- [ ] Contenedor padre tiene `w-full`

### Scroll Horizontal
- [ ] Contenedor tiene `w-full flex overflow-x-auto`
- [ ] Items tienen `whitespace-nowrap`
- [ ] NO tiene padding lateral extra

### Bottom Navigation
- [ ] Tiene `fixed bottom-0 left-0 right-0`
- [ ] Padding interno es `px-4 py-2`
- [ ] Contenedor interno tiene `w-full flex justify-around`

---

## EJEMPLOS ANTES/DESPUÉS

### Ejemplo 1: Card con Contenido

```jsx
// ❌ ANTES - No edge-to-edge, padding inconsistente
<div className="px-3">
  <div className="bg-[#2D2D2F] rounded-lg p-3">
    <h3 className="text-white">Título</h3>
    <p className="text-gray-400">Contenido</p>
  </div>
</div>

// ✅ DESPUÉS - Edge-to-edge con padding consistente
<div className="w-full px-4">
  <div className="w-full bg-[#2D2D2F] rounded-lg p-3">
    <h3 className="text-white">Título</h3>
    <p className="text-gray-400">Contenido</p>
  </div>
</div>
```

### Ejemplo 2: Lista de Items

```jsx
// ❌ ANTES
<div className="px-6">
  <h2>Lista</h2>
  {items.map(item => (
    <div key={item.id} className="bg-card p-3 rounded-lg">
      {item.name}
    </div>
  ))}
</div>

// ✅ DESPUÉS
<div className="w-full px-4">
  <h2 className="w-full">Lista</h2>
  <div className="w-full space-y-3">
    {items.map(item => (
      <div key={item.id} className="w-full bg-card p-3 rounded-lg">
        {item.name}
      </div>
    ))}
  </div>
</div>
```

### Ejemplo 3: Grid de Tarjetas

```jsx
// ❌ ANTES
<div className="px-3">
  <div className="grid grid-cols-3 gap-2">
    {accounts.map(account => (
      <div key={account.id} className="rounded-lg p-2" style={{ backgroundColor: account.color }}>
        {account.name}
      </div>
    ))}
  </div>
</div>

// ✅ DESPUÉS
<div className="w-full px-4">
  <div className="w-full grid grid-cols-3 gap-2">
    {accounts.map(account => (
      <div key={account.id} className="rounded-lg p-2" style={{ backgroundColor: account.color }}>
        {account.name}
      </div>
    ))}
  </div>
</div>
```

---

## ERRORES COMUNES A EVITAR

### ❌ Error 1: No poner w-full en el contenedor padre
```jsx
// ❌ MAL
<div className="px-4">
  <button className="w-full">Botón</button>
</div>

// ✅ BIEN
<div className="w-full px-4">
  <button className="w-full">Botón</button>
</div>
```

### ❌ Error 2: Usar padding diferente en cada página
```jsx
// ❌ MAL - Inconsistente
// Login.jsx
<div className="px-6">

// Dashboard.jsx
<div className="px-3">

// Settings.jsx
<div className="px-4">

// ✅ BIEN - Todas usan px-4
<div className="w-full px-4">
```

### ❌ Error 3: Olvidar los márgenes negativos en headers
```jsx
// ❌ MAL - Botones no llegan al borde
<div className="w-full px-4">
  <button className="w-10 h-10">❮</button>
</div>

// ✅ BIEN - Botones pegados al borde
<div className="w-full px-4">
  <button className="w-10 h-10 -ml-2">❮</button>
  <h1>Título</h1>
  <button className="w-10 h-10 -mr-2">❯</button>
</div>
```

### ❌ Error 4: Poner w-full en items de grid
```jsx
// ❌ MAL - Los items no se distribuyen correctamente
<div className="grid grid-cols-3 gap-2">
  <div className="w-full">Item 1</div>
  <div className="w-full">Item 2</div>
  <div className="w-full">Item 3</div>
</div>

// ✅ BIEN - El grid controla el ancho
<div className="w-full grid grid-cols-3 gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### ❌ Error 5: Usar justify-center sin control
```jsx
// ❌ MAL - Centra todo y no es edge-to-edge
<div className="flex justify-center">
  <div className="px-4">
    <h1>Título</h1>
  </div>
</div>

// ✅ BIEN - Edge-to-edge con padding interno
<div className="w-full px-4">
  <h1>Título</h1>
</div>

// ✅ BIEN - Solo centrar si es un formulario pequeño
<div className="w-full px-4">
  <form className="max-w-sm mx-auto">
    {/* Formulario centrado */}
  </form>
</div>
```

---

## TESTING EN DIFERENTES TAMAÑOS

### Móvil Pequeño (320px - iPhone SE)
```css
/* Verificar que el contenido no se corte */
/* px-4 = 16px cada lado = 32px total de padding */
/* Espacio disponible: 320px - 32px = 288px */
```

### Móvil Estándar (375px - iPhone 12/13)
```css
/* Espacio disponible: 375px - 32px = 343px */
/* Este es el tamaño target principal */
```

### Móvil Grande (414px - iPhone Pro Max)
```css
/* Espacio disponible: 414px - 32px = 382px */
/* El contenido se ve más espacioso pero bien balanceado */
```

### Tablet (768px+)
```css
/* Considera usar max-w-xl mx-auto para no estirar demasiado */
<div className="w-full max-w-2xl mx-auto px-4">
  {/* Contenido centrado en tablet/desktop */}
</div>
```

---

## RESUMEN DE CAMBIOS EN DASHBOARD

### Lo que se cambió:

1. ✅ **Header**: `px-3` → `px-4`, agregado `w-full`, botones `-ml-1` → `-ml-2`
2. ✅ **Tabs**: `px-3` → `px-4`, agregado `w-full` a contenedores
3. ✅ **Contenido**: `px-3` → `px-4`, agregado `w-full` a todos los contenedores
4. ✅ **Grid de cuentas**: Agregado `w-full`
5. ✅ **Botón REGISTROS**: Agregado `w-full` al contenedor padre
6. ✅ **Pills horizontales**: Agregado `w-full`
7. ✅ **Sección de tendencia**: Agregado `w-full` a contenedores y card

### Resultado:
- ✅ Diseño consistente con padding de 16px (px-4) en toda la página
- ✅ Todos los elementos usan el ancho completo disponible
- ✅ Botones del header llegan correctamente a los bordes
- ✅ Grid se expande correctamente
- ✅ No hay espacio desperdiciado

---

## PRÓXIMOS PASOS

1. **Revisar otras páginas** y aplicar los mismos principios:
   - [ ] Login.jsx - Cambiar `px-6` → `px-4`
   - [ ] Register.jsx - Cambiar `px-6` → `px-4`
   - [ ] AddAccount.jsx - Agregar `w-full` a contenedores
   - [ ] AddTransaction.jsx - Agregar `w-full` a contenedores
   - [ ] Transactions.jsx - Verificar padding y w-full
   - [ ] Statistics.jsx - Aplicar reglas cuando se implemente
   - [ ] Settings.jsx - Verificar padding (ya usa px-4)
   - [ ] Notifications.jsx - Verificar padding y w-full

2. **Crear componentes reutilizables** con estos patrones:
   ```jsx
   // PageContainer.jsx
   export function PageContainer({ children, className = '' }) {
     return (
       <div className={`min-h-screen bg-[#1C1C1E] pb-20 ${className}`}>
         {children}
       </div>
     )
   }

   // PageHeader.jsx
   export function PageHeader({ title, onBack, onAction, actionIcon }) {
     return (
       <div className="w-full bg-[#1C1C1E] px-4 pt-14 pb-4 flex items-center justify-between">
         <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
           {/* Back icon */}
         </button>
         <h1 className="text-white text-xl font-semibold">{title}</h1>
         <button onClick={onAction} className="w-10 h-10 flex items-center justify-center -mr-2">
           {actionIcon}
         </button>
       </div>
     )
   }

   // PageContent.jsx
   export function PageContent({ children, className = '' }) {
     return (
       <div className={`w-full px-4 pt-5 ${className}`}>
         {children}
       </div>
     )
   }
   ```

3. **Documentar en Storybook** (opcional pero recomendado):
   - Crear stories para cada componente
   - Mostrar versiones responsive
   - Documentar spacing y padding

---

## CONCLUSIÓN

Con estos cambios, tu app ahora tiene:
- ✅ Diseño edge-to-edge consistente
- ✅ Padding estándar de 16px (px-4) en todos lados
- ✅ Elementos con ancho completo (`w-full`)
- ✅ Mejor experiencia en dispositivos móviles
- ✅ Código más mantenible y predecible

**Siguiente paso:** Aplica estos mismos principios a las demás páginas usando esta guía como referencia.

---

**Documento creado el:** 3 de Noviembre, 2025
**Versión:** 1.0
**Autor:** Análisis y correcciones realizadas por Claude (Sonnet 4.5)
