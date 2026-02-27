# Software 0 & 1 - Piano Lezione

## 📚 Informazioni Lezione

- **Titolo**: Software 0 & 1
- **Argomento**: Fondamenti di architettura dei computer
- **Data creazione**: 2026-01-16

---

## 📹 Riferimenti Video

### 1. Boolean Logic & Boolean Algebra

- **Link**: [https://www.youtube.com/watch?v=XJC5WB2Bwrc](https://www.youtube.com/watch?v=XJC5WB2Bwrc)
- **Timestamp**: 03:00 - 08:00 (5 minuti)

## Extra:

Cambiare titolo in "Compiler Toolchain"
rimuovere GCC- Titolo, GNU vs GCC Opzioni Comuni, comabdo Base, Esempio Pratico.
Aggiungere animazione main C to main.exe

Nelle fasi del compilatore, la freccietta deve apparire nela fase succesiva alla apparizione del componetne main.c
nella fase di visione fare uno zoom tipo capitolo nella card del pre processor e mostrare i seguenti esempi:

fasi:

1. evidenzia il primo len.
2. evidenzia i len successivi.
3. sostituisci i len sotto con il 200

#define LEN 200

int evaluate()
{
int array[LEN];
for (int i = 0; i < LEN; i++)
{
// Something with array[i];
}
}

Fasi:
come quelle precenti
#define VALUE rand()

int evaluate()
{
int array[VALUE];
for (int i = 0; i < VALUE; i++)
{
// some operations
}
}

fase 3
come da video.
#include <stdio.h>

int evaluate()
{
printf("Hello, World!\n");
}

far rimanere freccia tra peprocessor e compiler

Compiler:

int sum(int a, int b)
{
return a + b;
}

sum:
push rbp
mov rbp, rsp
mov QWORD PTR [rbp-24], rdi
mov QWORD PTR [rbp-32], rsi
mov rdx, QWORD PTR [rbp-24]
mov rax, QWORD PTR [rbp-32]
add rax, rdx
mov QWORD PTR [rbp-8], rax
mov rax, QWORD PTR [rbp-8]
pop rbp
ret

nel Linker mettere main.o e libc

### 2. Stack

- **Link**: [https://youtu.be/u\_-oQx_4jvo](https://youtu.be/u_-oQx_4jvo)
- **Timestamp**: 03:45 - 10:05 (6 minuti e 20 secondi)
- **Argomenti chiave**:
  - Cos'è lo stack
  - LIFO (Last In First Out)
  - Operazioni push e pop
  - Stack Frame

  codice assemply allineato a sinistra e non centrale, e metterre la box con il codice a destra.

### 3. Registers

- **Link**: [https://youtu.be/5SICv-2tMgQ](https://youtu.be/5SICv-2tMgQ)
- **Timestamp**: 02:25 - 09:20 (circa 7 minuti)
- **Argomenti chiave**:
  - Cosa sono i registers
  - Tipi di registers
  - Ruolo nella CPU
  - Differenza tra registers e memoria
  - Registri a 8, 16, 32, 64 bit

---

## 📝 Struttura Presentazione Proposta

### Slide 1: Introduzione

- Titolo: "Software 0 & 1"
- Sottotitolo: "Fondamenti di Architettura dei Computer"

### Slide 2: Boolean Logic

- Tabelle di verità
- Operatori AND, OR, NOT
- Esempi visuali

### Slide 3: Boolean Algebra

- Leggi fondamentali
- Semplificazione di espressioni
- Applicazioni pratiche

### Slide 4: Lo Stack

- Concetto di LIFO
- Visualizzazione grafica dello stack
- Operazioni push/pop con animazioni

### Slide 5: I Registers

- Diagramma della CPU
- Tipi di registers (PC, IR, MAR, MDR, etc.)
- Flusso dati tra registers

### Slide 6: Riepilogo

- Punti chiave della lezione
- Collegamenti tra i concetti

---

## 🎨 Note per le Animazioni

### Boolean Logic

- Usare cerchi colorati per rappresentare TRUE/FALSE
- Animare le porte logiche
- Mostrare tabelle di verità con highlight progressivo

### Stack

- Animare push: elemento che scende dall'alto
- Animare pop: elemento che sale e scompare
- Usare rettangoli impilati con colori diversi

### Registers

- Schema a blocchi della CPU
- Frecce animate per mostrare il flusso dati
- Highlight dei registers quando vengono utilizzati

---

## ✅ Checklist Sviluppo

- [ ] Creare scene per Boolean Logic
- [ ] Creare scene per Boolean Algebra
- [ ] Creare scene per Stack con animazioni push/pop
- [ ] Creare scene per Registers con diagramma CPU
- [ ] Testare transizioni tra slide
- [ ] Verificare timing delle animazioni
- [ ] Preparare note di presentazione

---

## 📌 Note Aggiuntive

_Spazio per appunti durante lo sviluppo della presentazione_
