<script setup lang="ts">
import { ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
const { data: allPost } = await useFetch("/api/all", { key: "all" });
const textArea = ref("");
const createPostSqlite = async () => {
  let text = textArea.value;
  let exp =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  let text1 = text.replace(exp, "<a target='_blank' href='$1'>Link</a>");
  let exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  let text2 = text1.replace(
    exp2,
    '$1<a target="_blank" href="http://$2">Link</a>'
  );

  try {
    await useFetch("/api/create", {
      method: "POST",
      body: {
        text: text2,
      },
    });
    textArea.value = "";
    await refreshNuxtData("all");
  } catch (error) {
    console.log(error);
  }
};
const deletePostSqlite = async (id: number) => {
  try {
    await useFetch("/api/remove", {
      method: "DELETE",
      body: {
        id,
      },
    });
    await refreshNuxtData("all");
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="container mt-3 d-flex flex-column">
    <form @submit.prevent="createPostSqlite">
      <textarea
        class="d-flex justify-content-center form-control"
        placeholder="Fill With URL"
        v-model="textArea"
      ></textarea>
      <button
        class="btn btn-primary mt-2 mb-2"
        style="width: 100px; height: 30px"
      >
        Submit
      </button>
    </form>
    <div v-if="allPost.length > 0">
      <div class="card mb-2" v-for="(post, index) in allPost" :key="index">
        <div class="card-body d-flex justify-content-between">
          <div v-html="post.content"></div>
          <div>
            <button class="btn btn-danger" @click="deletePostSqlite(post.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Empty</div>
  </div>
</template>
