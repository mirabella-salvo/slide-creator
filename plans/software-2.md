# Software 2 - Piano Lezione

## Informazioni Lezione

- **Titolo**: Software 2 - Buffer Overflow & Stack Canary
- **Argomento**: Comprendere visivamente cos'e' un buffer overflow e la protezione canary
- **Data creazione**: 2026-03-25

---

## Obiettivo

Mostrare visivamente come funziona un buffer overflow basato su stack,
usando codice C con `gets()` vulnerabile, visualizzando stack, registri e assembly.
Dimostrare poi la protezione tramite stack canary.

---

## Codice C

```c
void win()
{
    // ...
    return;
}

void ask_name()
{
    char name[16];
    gets(name);
    printf("Hello, %s!\n", name);
    return;
}

int main()
{
    ask_name();
    return 0;
}
```

---

## Struttura Presentazione

### Scena: Stack Overflow (`src/scenes/stack-overflow.tsx`)

Layout: Stack a sinistra, Codice C a destra, Registri in basso.
7 registri: RSP, RBP, RDI, RSI, RDX, RAX, R8 (canary).
8 celle stack con indirizzi di memoria.

---

### FASE 1: Codice C (Slide 1-2)

**Slide 1**: Mostra codice C con syntax highlighting (win, ask_name, main)
**Slide 2**: Evidenzia flusso esecuzione:
- main() -> ask_name() -> gets(name) vulnerabile
- Flash rosso su `char name[16]` ("solo 16 bytes!")

### FASE 2: Assembly + Setup Stack (Slide 3-7)

Assembly di ask_name con canary:
```asm
ask_name:
    push    rbp
    mov     rbp, rsp
    sub     rsp, 32
    mov     QWORD PTR [rbp-8], r8   ; store canary
    lea     rdi, [rbp-24]
    call    gets
    ...
    mov     rax, QWORD PTR [rbp-8]  ; load canary
    cmp     rax, r8                  ; check canary
    jne     __stack_chk_fail
    leave
    ret
```

Stack layout:
| Cella | Indirizzo | Contenuto | Label |
|-------|-----------|-----------|-------|
| 0 | 0x7FF0 | ... | main() |
| 1 | 0x7FE8 | main+1 | return addr |
| 2 | 0x7FE0 | 0x7FF0 | saved RBP |
| 3 | 0x7FD8 | 0xDEAD | CANARY (gold) |
| 4 | 0x7FD0 | name[8..15] | buffer hi |
| 5 | 0x7FC8 | name[0..7] | buffer lo |
| 6-7 | 0x7FC0-0x7FB8 | padding | |

**Slide 3**: Transizione a assembly, mostra stack + registri
**Slide 4**: push rbp -> saved RBP in cella 2
**Slide 5**: mov rbp, rsp -> RBP = 0x7FE0
**Slide 6**: sub rsp, 32 -> RSP a cella 6
**Slide 7**: Store canary 0xDEAD in cella 3 (bordo gold)

### FASE 3: Esecuzione Normale (Slide 8-11)

**Slide 8**: gets("Alice") -> "Alice\0" in cella 5
**Slide 9**: printf -> output "Hello, Alice!"
**Slide 10**: Canary check: RAX = 0xDEAD == R8 = 0xDEAD -> MATCH (verde)
**Slide 11**: leave + ret -> return pulito a main+1

### FASE 4: Buffer Overflow Attack (Slide 12-14)

**Slide 12**: Reset stack, titolo "Buffer Overflow Attack" (rosso)
**Slide 13**: gets() con overflow, cascata cella per cella:
1. Cella 5: "AAAAAAAA" (buffer lo) - bordo giallo
2. Cella 4: "AAAAAAAA" (buffer hi) - bordo giallo
3. Cella 3: "AAAAAAAA" sovrascrive CANARY - bordo ROSSO, "CORRUPTED!"
4. Cella 2: "AAAAAAAA" sovrascrive RBP - bordo ROSSO
5. Cella 1: "&win()" sovrascrive return addr - bordo VIOLA
**Slide 14**: printf con output lungo

### FASE 5: Senza Canary (Slide 15-16)

**Slide 15**: Dim righe canary nell'assembly. "Without Canary?"
**Slide 16**: ret legge "&win()" -> "Control Flow Hijacked!" (rosso)

### FASE 6: Con Canary Protection (Slide 17-20)

**Slide 17**: Ripristina righe canary. "With Canary Protection" (teal)
**Slide 18**: Canary check FAIL: RAX = "AAAAAAAA" vs R8 = "0xDEAD" -> MISMATCH (rosso)
**Slide 19**: jne __stack_chk_fail -> flash rosso, "*** stack smashing detected ***"
**Slide 20**: Lezione finale: "Stack Canary Protection"

---

## Note Animazioni

- Stessi pattern di `src/scenes/stack.tsx`:
  - Frecce RSP (teal #4ec9b0) e RBP (arancione #ce9178)
  - Flash bianco + ingrandimento sui registri
  - Opacity transitions, highlight rectangle
- Nuovi effetti:
  - Overflow a cascata (cella per cella con cambio colore)
  - Dim/restore righe assembly per canary
  - Confronto visivo registri (RAX vs R8)
  - Flash rosso per crash
  - Titoli di fase overlay

---

## Checklist Sviluppo

- [x] Creare scena stack-overflow.tsx con buffer overflow + canary
- [x] Configurare project.ts con la scena
- [ ] Testare animazioni con `yarn dev`
- [ ] Verificare timing delle transizioni
- [ ] Verificare leggibilita' del codice C e assembly
- [ ] Verificare overflow a cascata sia chiaro visivamente
- [ ] Verificare confronto canary (match e mismatch)
