---js
const title = '1 June 2025: DIY, Double-Entry Accounting, and Shameless Green';
const date = "2025-06-01";
const draft = false;
const tags = ["ruby"];
---

Lately I discovered a conflict between how my bank reports pending transactions
and how You Need a Budget (YNAB) records them. YNAB is a household budgeting app
that provides an estimate of available cash after expected expenses. However
those estimates can go off when pending transactions are changed, deleted, or
replaced. This is often the case with delivery services and tips.

When I'm chewing on a difficult topic I like to model parts of it in code. The
point of many of my DIY projects isn't to create a viable product or customize
software to my needs but to explore practical aspects of a problem using data
that's of interest to me. Also I get practice in understanding edge cases for a
problem.

### Problem

Statements from my bank record each transaction, a sample of transactions look
like this:

```
05/01/2025  Deposit     $1,000
05/01/2025  Groceries   $-100
```

Double-entry accounting uses a minimum of two records for each transaction. A
transaction is recorded as a credit on one "account" and a debit on another
account. This provides a clearer picture of where money comes from and where it
goes.

```
Date        Account     Credit  Debit
2025-05-01  Income      1000
2025-05-01  Checking            1000
2025-05-01  Groceries           100
2025-05-01  Checking    100
```

### Shameless Green

I've been working on practicing the shameless green programming model (as
described by [Sandi Metz](https://sandimetz.com/99bottles)). Shameless green is
a test-driven development method that priorities creating the simplest code
possible to pass unit tests. Style issues like Don't Repeat Yourself (DRY) are
left for later revision and refactoring.

A lot of this is very basic, but it's a new language for me.

- Hello World
  1. Test that the project layout and testing setup works

- Importing CVS
  1. Load full file
  2. Skip metadata lines
  3. Process header line
  4. Tweak starting balance line
  5. Convert to CSV::Row objects

- Processing lines
  1. Parse date string to date object
  2. Remove commas from number strings
  3. Convert numbers to floats

- Building double-entry transactions: gnucash and
  [ledger](https://hledger.org/start.html) use a model with _transactions_ with
  two or more _splits_.
  1. Match CSV columns to object fields
  2. Check integrity: credits = debits
  3. Missing field check

### Steps Forward

This is a learning project to explore double-entry accounting. For day-to-day tracking, existing software does the job. If I come back to this, the next step would be expanding the import system to automatically classify transactions, and implementing basic income and balance statements.
