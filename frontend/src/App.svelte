<script lang="ts">
  import Note from './components/Note.svelte';
  import "./app.css";
  import "./assets/fonts.css"
  import "./assets/material-icons.css"
  import Header from './components/Header.svelte';
</script>

<main class="w-full max-w-screen min-h-screen bg-primary flex flex-col items-center">
  <Header />
  <div class="container flex flex-col md:flex-row md:justify-evenly gap-2"> 
    <div class="md:w-1/3 lg:w-1/4">
      <span class="font-ibmplex ml-3 sm:m-0 text-complement border-b pb-1 border-complement">To do</span>
      <div class="flex flex-col flex-wrap py-2 ">
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="To do" noteTitle="
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque corrupti, commodi eaque recusandae ex cupiditate cumque. Quibusdam recusandae reiciendis quo magnam fuga ipsam aliquid, iure porro autem sint saepe quis. "></Note>
      </div>
    </div>
    <div class="md:w-1/3 lg:w-1/4">
      <span class="font-ibmplex ml-3 sm:m-0 text-complement border-b pb-1 border-complement">In progress</span>
      <div class="flex flex-col flex-wrap py-2">
        <Note dueDate="1733626891" noteDescription="lorem laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfjlaksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfjlaksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj" noteId="1" noteStatus="In progress" noteTitle="Big busy"></Note>
        <Note dueDate="1733626891" noteDescription="lorem laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfjlaksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfjlaksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj" noteId="1" noteStatus="In progress" noteTitle="Big busy"></Note>
      </div>
    </div>
    <div class="md:w-1/3 lg:w-1/4">
      <span class="font-ibmplex ml-3 sm:m-0 text-complement border-b pb-1 border-complement">Completed</span>
      <div class="flex flex-col flex-wrap py-2 ">
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
        <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
      </div>
    </div>
    <!-- <div class="flex flex-col flex-wrap sm:gap-2 sm:w-1/3 sm:h-screen">
      <Note dueDate="1733626891" noteDescription="lorem laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfjlaksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfjlaksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj" noteId="1" noteStatus="In progress" noteTitle="Big busy"></Note>
      <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="To do" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
      <Note dueDate="1733626891" noteDescription="" noteId="1" noteStatus="Completed" noteTitle="Lorem ipsum dolor sit amert laksdjflaskdjfasldkfjalsdkfjalsdfk alksdfjalsdkfj asdlkfjasdflkasj asldkfajlsdfk"></Note>
    </div> -->
    
  </div>
</main>

