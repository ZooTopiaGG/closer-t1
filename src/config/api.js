export default {
  admin: {
    // 微信授权获取code
    get_auth_path: 'closer_auth.get_auth_path',
    login_with_wechat: 'closer_auth.login_with_wechat',
    closeruser_regist: 'closer_auth.closeruser_regist',
    get_code_by_phone: 'closer_account.get_code_by_phone_v2',
    check: 'closer_account.check',
    check_wechat: 'closer_account.check_wechat',
    info: 'closer_user.info',
    // 用户详情
    user_show: 'closer_user.show',
    bind_phone: 'closer_account.bind_phone',
    // 点赞
    like: 'closer_reply.like',
    // 回复 评论
    add_reply: 'closer_reply.add_reply',
    // 邀请人书
    invite_counts: 'closer_user.invite_counts',
    wechat_config: 'closer_share.wechat_config'
  },
  command: {
    // 贴子详情
    show: 'closer_subject.show',
    // 阅读量统计
    incr_view: 'closer_subject.incr_view',
    // 留言列表
    comments: 'closer_reply.comments',
    // 获取video播放密钥
    videos: 'ali_vod.accessInfo',
    // 举报
    report: 'closer_report.add',
    // 点赞
    like: 'closer_reply.like',
    // 评论以及回复评论
    add_reply: 'closer_reply.add_reply',
    // 富评论下的子评论
    replys: 'closer_reply.replys',
    // 举报列表
    reportType: 'closer_report.get_report_types',
    hot_subjects: 'closer_subject.hot_subjects',
    collectionsV2: 'closer_subject.collectionsV2'
  },
  community: {
    // 栏目实体
    show: 'closer_community.show',
    // 获取栏目下贴子列表
    community_subject_list_index: 'closer_subject.community_subject_list_index',
    // 订阅/取消订阅
    subscription: 'closer_community.subscription'
  },
  group: {
    show: 'closer_class.show',
    // 正在招募的群组
    recruiting: 'closer_class.recruiting',
    group_subject_list: 'closer_subject.class_subject_list_index',
    share_group: 'closer_share.outer_group',
    join: 'closer_classuser.join',
    apply_join: 'closer_classuser.apply_join',
  },
  activity: {
    // 活动接口
    get_activity: 'closer_activity.get_activity',
    add_channel: 'activity_worldcup.add_channel',
    check_guess_result: 'activity_worldcup.check_guess_result',
    get_match_list: 'activity_worldcup.get_match_list',
    get_user_guess_list: 'activity_worldcup.get_user_guess_list',
    get_user_guess_statistic: 'activity_worldcup.get_user_guess_statistic',
    guess_match: 'activity_worldcup.guess_match',
    receive_chance: 'activity_worldcup.receive_chance',
    check_guess_result: 'activity_worldcup.check_guess_result',
    activity_water_chance: "activity_water.chance",
    activity_water_update: "activity_water.update",
    activity_water_join: "activity_water.join",
    get_invite_statistic: "closer_invite.get_statistic",
    get_invitee_page_list: "closer_invite.get_invitee_page_list",
    get_yesterday_award_amt: "closer_invite.get_yesterday_award_amt",
    remind_login: "closer_invite.remind_login"
  },
  statitics: {
    // 数据统计接口
    view_count: 'closer_promotion_activity.view_count',
    get_adcookie: 'closer_statistics.get_adcookie'
  },
  share: {
    wechat_config: 'closer_share.wechat_config',
    get_adcookie: 'closer_statistics.get_adcookie',
    common: 'closer_statistics.user_action_v2',
  }
}