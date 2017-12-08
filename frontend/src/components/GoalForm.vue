    <template id="form">
        <div class="form-group form-inline">
        <select v-model="cate_num" class="form-control form-margin" name="cate_num">
            <option value="1">생활/쇼핑</option>
            <option value="2">교통</option>
            <option value="3">식비</option>
            <option value="4">패션/미용</option>
            <option value="5">주거/통신</option>
            <option value="6">미분류</option>
        </select>
        <input type="text" placeholder="시작일" v-model="start_date" class="form-control form-margin" name="start_date">
        <input type="text" placeholder="종료일" v-model="end_date" class="form-control form-margin" name="end_date">
        <input type="text" placeholder="목표금액" v-model="g_price" class="form-control form-margin" name="g_price">
        </div>
    </template>
