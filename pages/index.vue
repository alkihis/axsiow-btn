<template lang="pug">
  v-row.px-2(justify="center" no-gutters)
    v-col.text-center(cols="12" sm="10" md="8" xl="6")
      h1.text-h4.text-lg-h3.font-weight-bold.pa-8 Ta gueule Axsiow !

      div
        p.text-h6 Linux, réseau, élitisme d'ingénieur, Grenoble, ski ou chauvinisme régional, Axsiow vous casse les couilles ?
        v-btn.text-none(color="primary" :loading="pushing" :disabled="pushing" @click="pushButton") Appuyez ici pour relâcher votre rage

      .mt-8
        p.text-subtitle-2
          | Axsiow a déjà cassé les couilles des gens&nbsp;
          span.tg-count {{ axsiowCount }}
          |  fois.
        p.red--text.font-weight-bold.text-h6(v-if="pushId")
          | Merci d'avoir témoigné de votre rage.
          br
          | Typical dev, ça 🙄

      .mt-4(v-if="pushId")
        p.text-subtitle-1.font-weight-bold.pt-4
          | Pour quelle raison avez-vous appuyé sur&nbsp;
          em LE bouton
          | &nbsp;?

        .limit-select.mb-4
          v-select.mt-6.mb-2(
            v-model="reason" :items="reasonsItems"
            label="Sélectionnez une raison" outlined dense hide-details
          )
          v-text-field(
            v-if="reason === '__other__'" v-model="reasonExplained"
            placeholder="Expliquez la raison..." outlined dense hide-details
          )

        v-btn.text-none.white--text(
          color="green darken-1" :loading="sendingReason"
          :disabled="sendingReason" @click="sendReason"
        ) Envoyer la raison
      p.text-h6.font-weight-bold.pt-8.blue--text.text--darken-1(v-if="reasonSent") Votre commentaire a été envoyé. Merci !
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
  async asyncData({ $axios }) {
    try {
      const { count } = await $axios.$get('/api/count');
      return { axsiowCount: count };
    } catch (e) {
      if ('toJSON' in e) {
        console.log(e.toJSON());
      }

      return { axsiowCount: 0 };
    }
  },
})
export default class extends Vue {
  /** The count to display */
  axsiowCount!: number;

  /** Reasons */
  reason = '';
  reasonExplained = '';
  reasonsItems = [
    { value: '__grenoble__', text: 'Grenoble', },
    { value: '__piolle__', text: 'Eric Piolle', },
    { value: '__sex__', text: 'Le CUL', },
    { value: '__devs__', text: 'Les devs, ces cons 🙄', },
    { value: '__network__', text: 'Le réseau c\'est mieux', },
    { value: '__argot__', text: 'NoN mAiS tOuT lE mOnDe CoNnAîT "nArVaLo"', },
    { value: '__hugues__', text: 'Le ski', },
    { value: '__jmlp__', text: 'Un détail ça 🙄', },
    { value: '__macron__', text: 'Axsiow dit un truc de droite', },
    { value: '__noix__', text: 'Hot take random sur la bouffe', },
    { value: '__marseille__', text: 'Exagère beaucoup trop', },
    { value: '__other__', text: 'Autre...', },
  ];
  reasonSent = false;

  /** Push states */
  pushing = false;
  pushId = '';
  sendingReason = false;

  async pushButton() {
    if (this.pushing) {
      return;
    }

    this.pushing = true;

    try {
      const { pushId } = await this.$axios.$post('/api/push-button');
      this.pushId = pushId;
      this.axsiowCount++;
    } catch (e) {
      if (e?.response?.data?.code) {
        const code = e.response.data.code;

        if (code === 1) {
          this.$toast.error('Vous avez déjà appuyé sur le bouton récemment.');
        } else {
          this.$toast.error('Erreur inconnue.');
        }
      } else {
        this.$toast.error('Impossible d\'appuyer sur le bouton.');
      }

      console.log(e?.response?.data ?? e);
    } finally {
      this.pushing = false;
    }
  }

  async sendReason() {
    if (this.sendingReason || !this.pushId) {
      return;
    }

    if (this.reasonSent) {
      this.$toast.info('La raison a déjà été envoyée.');
      return;
    }

    const reason = this.reason === '__other__' ? this.reasonExplained : this.reason;

    if (!reason) {
      this.$toast.error('Vous devez préciser une raison.');
      return;
    }

    this.sendingReason = true;

    try {
      await this.$axios.$post('/api/send-reason', {
        pushId: this.pushId,
        reason,
      });
      this.reasonSent = true;
    } catch (e) {
      this.$toast.error('Impossible d\'envoyer la raison.');
      console.log(e?.response?.data ?? e);
    } finally {
      this.sendingReason = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.limit-select {
  max-width: 600px;
  margin: auto;
}
</style>
