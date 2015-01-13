
/* description: Parses and evaluates JSON */

/* lexical grammar */
%lex

esc \\\\

%%
\s+  /* skip whitespace?  */;

/* this doesn't appear to work for double quotes */
\"(?:{esc}[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"{esc}])*\" { yytext = yytext.substring(1, yyleng-1); return 'chars';}

\{    return '{';
\}    return '}';
\[    return '[';
\]    return ']';
\,    return ',';
\:    return ':';
\-?[0-9]+\.[0-9]+   return 'NUMBER';
\-?[0-9]+   return 'NUMBER';
false return 'false';
true return 'true';
null return 'null';

/lex

%start JSONText

%%

JSONText
  : JSONValue  { $$ = $1; return $1 }
  ;

JSONValue
  : JSONArray  { $$ = $1 }
  | JSONNumber { $$ = $1 }
  | JSONObject { $$ = $1 }
  | 'true'     { $$ = true  }
  | 'false'    { $$ = false }
  | 'null'     { $$ = null }
  |  chars     { $$ = $1 }
  ;

JSONArray
  : '[' ']'  { $$ = [] }
  | '[' JSONArrayElements ']' { $$ = $2 }
  ;

JSONArrayElements
  : JSONValue     { $$ = [$1] }
  | JSONValue ',' JSONArrayElements  { $3.unshift($1); $$ = $3 }
  ;

JSONObject
  : '{' '}'  { $$ = {} }
  | '{' JSONObjectMembers '}'  { $$ = $2 }
  ;

JSONObjectMembers
  : JSONObjectPair    { temp = {}; temp[$1[0]] = $1[1]; $$ = temp }
  | JSONObjectMembers ',' JSONObjectPair { $1[ $2[0]] = $2[1]; $$ = $1 }
  ;

JSONObjectPair
  : chars ':' JSONValue { $$ = [$1, $3]; }
  ;

JSONNumber
  : NUMBER   { $$ = Number(yytext) }
  ;
